import BackComponent from "@/src/components/back_component";
import CreateSubjectModal from "@/src/components/modals/create-subject.modal";
import SubjectComponent from "@/src/components/subject-component";
import { useSubjectStore } from "@/src/stores/subject.store";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SubjectsList = () => {
  const { getAllSubject, subjects } = useSubjectStore();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllSubject();
  }, [getAllSubject]);

  const handleCreateSubject = () => {
    setShowModal(true);
  };

  return (
    <>
      <CreateSubjectModal
        modalVisible={showModal}
        setModalVisible={setShowModal}
      />
      <SafeAreaView className="p-8">
        <BackComponent />

        <View className="flex-row justify-between">
          <Text>Subjects:</Text>
          <Pressable
            className="px-4 py-2 bg-primary-300 rounded-md"
            onPress={handleCreateSubject}
          >
            <Text>Add</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerClassName="pb-[200px] py-8 gap-4">
          {subjects &&
            subjects.map((subject, index) => {
              return (
                <SubjectComponent subject={subject} key={subject.id || index} />
              );
            })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SubjectsList;
