import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Content = () => {
  const navigation = useNavigation();
  const [selectedDescription, setSelectedDescription] = useState('');

  const links = [
    {
      id: 1,
      title: '이진 탐색 (Binary Search)',
      description:
        '정렬된 배열에서 특정 값을 찾는 고속 검색 알고리즘입니다. 중간 값과 찾고자 하는 값의 크기를 비교하여 찾고자 하는 값이 왼쪽에 있는지 오른쪽에 있는지 판단하여 검색 범위를 반으로 줄여가는 방식으로 동작합니다.',
    },
    {
      id: 2,
      title: '선형 탐색 (Linear Search)',
      description:
        '리스트에서 특정 값을 찾기 위해 처음부터 순서대로 탐색하는 알고리즘입니다.',
    },
    {
      id: 3,
      title: '선택 정렬 (Selection Sort)',
      description:
        '가장 작은(혹은 가장 큰) 원소를 찾아 첫 번째 위치(또는 마지막 위치)와 교환합니다. 이 과정을 반복하여 정렬하는 알고리즘입니다.',
    },
    {
      id: 4,
      title: '삽입 정렬 (Insertion Sort)',
      description:
        '두 번째 원소부터 시작하여 앞쪽의 원소들과 비교하여 자신의 위치를 찾아 삽입하는 알고리즘입니다.',
    },
    {
      id: 5,
      title: '버블 정렬 (Bubble Sort)',
      description:
        '인접한 두 원소를 비교하여 순서가 맞지 않은 경우 서로 교환하는 알고리즘입니다. 최악의 경우 시간 복잡도가 매우 높습니다.',
    },
    {
      id: 6,
      title: '합병 정렬 (Merge Sort)',
      description:
        '분할 정복(divide and conquer) 알고리즘의 하나로, 리스트를 분할하고 정렬한 다음 합병하는 과정을 반복하여 정렬하는 알고리즘입니다.',
    },
    {
      id: 7,
      title: '퀵 정렬 (Quick Sort)',
      description:
        '분할 정복(divide and conquer) 알고리즘의 하나로, 리스트를 분할하고 정렬하는 과정을 반복하여 정렬하는 알고리즘입니다. 평균적으로 매우 빠른 속도를 보입니다.',
    },
    {
      id: 8,
      title: '힙 정렬 (Heap Sort)',
      description:
        '힙 자료구조를 활용하여 정렬하는 알고리즘으로, 힙을 구성하고 최대 힙 또는 최소 힙에서 순서대로 원소를 꺼내 정렬합니다.',
    },
  ];

  const handleAlgorithmPress = (title, description) => {
    setSelectedDescription(description);
  };

  const handleLearnMore = (id) => {
    // 해당 알고리즘을 학습하는 화면으로 이동하는 로직을 작성할 수 있습니다.
    switch (id) {
      case 1:
        navigation.navigate('BinarySearch'); // BinarySearch 컴포넌트로 네비게이션
        break;
      case 2:
        navigation.navigate('LinearSearch'); // LinearSearch 컴포넌트로 네비게이션
        break;
      // 나머지 알고리즘들에 대한 화면 전환 로직도 추가합니다.
      default:
        console.log('해당 알고리즘에 대한 학습 화면이 없습니다.');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>학습할 알고리즘을 골라주세요.</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {links.map(({ id, title, description }) => (
          <TouchableOpacity key={id} style={styles.algorithmItem} onPress={() => handleAlgorithmPress(title, description)}>
            <Text style={styles.algorithmText}>{title}</Text>
            {selectedDescription === description && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{description}</Text>
                <TouchableOpacity style={styles.learnMoreButton} onPress={() => handleLearnMore(id)}>
                  <Text style={styles.learnMoreButtonText}>알고리즘 학습</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#17b6c4', // 파란색 글자
    marginBottom: 20,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  algorithmItem: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#17b6c4', // 파란색 테두리
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
  algorithmText: {
    color: 'white', // 하얀색 글자
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  description: {
    color: 'gray', // 회색 글자
    fontSize: 14,
    marginBottom: 10,
  },
  learnMoreButton: {
    backgroundColor: 'black', // 배경색을 검은색으로 변경
    borderColor: '#17b6c4', // 테두리 색은 그대로
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  learnMoreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Content;
