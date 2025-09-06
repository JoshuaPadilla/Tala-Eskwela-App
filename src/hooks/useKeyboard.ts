import { useEffect, useRef, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

type KeyboardCallback = (e: KeyboardEvent) => void;

interface KeyboardListener {
  isKeyboardVisible: boolean;
  keyboardHeight: number;
  onKeyboardDidShow: (callback: KeyboardCallback) => () => void;
  onKeyboardDidHide: (callback: () => void) => () => void;
}

const initialState = {
  isKeyboardVisible: false,
  keyboardHeight: 0,
};

export const useKeyboard = (): KeyboardListener => {
  const [state, setState] = useState(initialState);

  // Use a ref to store a list of callbacks so they don't trigger re-renders
  const didShowCallbacks = useRef<KeyboardCallback[]>([]);
  const didHideCallbacks = useRef<(() => void)[]>([]);

  useEffect(() => {
    // Event listener for when the keyboard shows
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      (e: KeyboardEvent) => {
        setState({
          isKeyboardVisible: true,
          keyboardHeight: e.endCoordinates.height,
        });
        didShowCallbacks.current.forEach((callback) => callback(e));
      }
    );

    // Event listener for when the keyboard hides
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setState(initialState);
      didHideCallbacks.current.forEach((callback) => callback());
    });

    // Cleanup function to remove listeners
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []); // Empty dependency array ensures listeners are set up once

  const onKeyboardDidShow = (callback: KeyboardCallback) => {
    didShowCallbacks.current.push(callback);
    return () => {
      // Return a cleanup function
      didShowCallbacks.current = didShowCallbacks.current.filter(
        (cb) => cb !== callback
      );
    };
  };

  const onKeyboardDidHide = (callback: () => void) => {
    didHideCallbacks.current.push(callback);
    return () => {
      // Return a cleanup function
      didHideCallbacks.current = didHideCallbacks.current.filter(
        (cb) => cb !== callback
      );
    };
  };

  return {
    ...state,
    onKeyboardDidShow,
    onKeyboardDidHide,
  };
};
