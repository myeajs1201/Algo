import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Animated, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BinarySearch = () => {
  const navigation = useNavigation();
  const stepData = [
    {
      id: 1,
      description:
        '이진 탐색은 정렬된 배열에서 데이터를 탐색하는 알고리즘입니다.',
      color: '#17b6c4', // 빨간색
    },
    {
      id: 2,
      description: '숫자 3을 탑색해보도록 하겠습니다.',
      color: '#17b6c4', // 초록색
    },
    {
      id: 3,
      description:
        '먼저 배열의 정중앙에 있는 수를 찾습니다. 여기선 5가 됩니다.',
      color: '#17b6c4', // 초록색
    },
    {
      id: 4,
      description:
        '5와 탐색할 수인 3을 비교합니다. 3은 5보다 작으니 탐색 중인 데이터는 배열 좌측에 있다는 것을 알 수 있습니다.',
      color: '#17b6c4', // 초록색
    },
    {
      id: 5,
      description:
        '필요가 없어진 숫자는 후보에서 제외됩니다. 여기서는 5, 6, 7, 8, 9가 됩니다.',
      color: '#17b6c4', // 초록색
    },
    {
      id: 6,
      description: '남은 배열의 정중앙 있는 수를 찾습니다. 여기선 2가 됩니다.',
      color: '#17b6c4', // 초록색
    },
    {
      id: 7,
      description:
        '2와 탐색할 숫자인 3을 비교합니다. 2는 3보다 작으니 3은 오른쪽에 있다는 것을 알 수 있습니다.',
      color: '#17b6c4', // 초록색
    },
    {
      id: 8,
      description: '필요 없어진 숫자를 후보에서 제외합니다.',
      color: '#17b6c4', // 초록색
    },
    {
      id: 9,
      description:
        '남은 배열의 정중앙에 있는 수를 찾습니다. 여기선 3이 됩니다.',
      color: '#17b6c4', // 초록색
    },
    {
      id: 10,
      description: '3 = 3으로 탐색 중인 숫자를 발견했습니다.',
      color: '#17b6c4', // 초록색
    },
    {
      id: 11,
      description:
        '이진 탐색은 배열이 정렬되어 있다는 점을 활용하여 탐색할 범위를 매번 반씩 줄여나갈 수 있습니다.' +
        ' 이것으로 이진 탐색에 대한 설명을 마치겠습니다.\n\n\n 아래의 코드 제공 버튼을 통해 해당 알고리즘을 구현한 코드를 받아보세요! 코드는 ChatGPT 3.5를 통해 제공됩니다.',
      color: '#17b6c4', // 초록색
    },
  ];

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const animations = useRef(array.map(() => new Animated.Value(0))).current;
  const [step, setStep] = useState(0); // 가장 큰 id의 수로 초기화
  const [stepDescription, setStepDescription] = useState(
    stepData[step].description,
  );

  useEffect(() => {
    animateArray();
    setStepDescription(stepData[step].description);
  }, [step]);

  const animateArray = () => {
    Animated.stagger(
      100,
      animations.map((anim, index) => {
        return Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        });
      }),
    ).start();
  };

  const handleNextStep = () => {
    if (step < stepData.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleFirstStep = () => {
    setStep(0);
  };

  const handleGenerateExampleCode = () => {
    // Navigate to CodeGenerate screen and pass algorithm name as parameter
    navigation.navigate('CodeGenerate', {algorithmName: '이진 탐색'});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이진 탐색 (Binary Search)</Text>
      <Text style={styles.description}>
        {' '}
        정렬된 배열에서 특정 값을 찾는 고속 검색 알고리즘입니다. 중간 값과
        찾고자 하는 값의 크기를 비교하여 찾고자 하는 값이 왼쪽에 있는지 오른쪽에
        있는지 판단하여 검색 범위를 반으로 줄여가는 방식으로 동작합니다.
      </Text>
      <View style={[styles.animationContainer, {alignItems: 'center'}]}>
        {array.map((number, index) => {
          let backgroundColor = '#444444';
          switch (stepData[step].id) {
            case 1:
              backgroundColor = '#17b6c4'; // id가 1이면 모든 숫자에 색상 변경
              break;
            case 2:
              if (number === 3) {
                backgroundColor = '#17b6c4'; // id가 2이고 숫자가 3일 때 색상 변경
              }
              break;
            case 3:
              if (number === 5) {
                backgroundColor = '#17b6c4'; // id가 3이고 숫자가 5일 때 색상 변경
              }
              break;
            case 4:
            case 5:
              if (number < 5) {
                backgroundColor = '#17b6c4'; // id가 4이고 숫자가 5보다 작을 때 색상 변경
              }
              break;
            case 6:
              if (number === 2) {
                backgroundColor = '#7822be'; // id가 6이고 숫자가 2일 때 노란색으로 변경
              } else if (number < 5) {
                backgroundColor = '#17b6c4'; // id가 6이고 숫자가 5보다 작을 때 초록색으로 변경
              }
              break;
            case 7:
              if (number === 2) {
                backgroundColor = '#7822be'; // id가 6이고 숫자가 2일 때 노란색으로 변경
              } else if (number === 3) {
                backgroundColor = '#17b6c4'; // id가 6이고 숫자가 5보다 작을 때 초록색으로 변경
              }
              break;
            case 8:
              if (number > 2 && number < 5) {
                backgroundColor = '#17b6c4'; // id가 4이고 숫자가 5보다 작을 때 색상 변경
              }
              break;
            case 9:
              if (number === 3) {
                backgroundColor = '#7822be'; // id가 6이고 숫자가 2일 때 노란색으로 변경
              } else if (number === 4) {
                backgroundColor = '#17b6c4'; // id가 6이고 숫자가 5보다 작을 때 초록색으로 변경
              }
              break;
            case 10:
            case 11:
              if (number === 3) {
                backgroundColor = '#7822be'; // id가 6이고 숫자가 2일 때 노란색으로 변경
              }
              break;
            default:
              break;
          }
          const animatedStyle = {
            transform: [
              {
                scaleY: animations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
            backgroundColor: backgroundColor, // 숫자의 배경색 적용
          };

          return (
            <Animated.View
              key={index}
              style={[styles.numberAnimation, animatedStyle]}>
              <Text style={styles.numberText}>{number}</Text>
            </Animated.View>
          );
        })}
      </View>
      <Text style={styles.description}>{stepDescription}</Text>
      {step === stepData.length - 1 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#17b6c4'}]}
            onPress={handleGenerateExampleCode}>
            <Text style={styles.buttonText}>코드 제공 </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#17b6c4'}]}
            onPress={() => navigation.navigate('CodeCompiler')}>
            <Text style={styles.buttonText}>컴파일</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: step === 0 ? '#888' : '#17b6c4'},
          ]}
          onPress={handleFirstStep}
          disabled={step === 0}>
          <Text style={styles.buttonText}>처음으로</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: step === 0 ? '#888' : '#17b6c4'},
          ]}
          onPress={handlePreviousStep}
          disabled={step === 0}>
          <Text style={styles.buttonText}>이전 단계</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                step === stepData.length - 1 ? '#888' : '#17b6c4',
            },
          ]}
          onPress={handleNextStep}
          disabled={step === stepData.length - 1}>
          <Text style={styles.buttonText}>다음 단계</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#17b6c4',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  animationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchText: {
    color: '#17b6c4',
    fontSize: 16,
    marginBottom: 10,
  },
  numberAnimation: {
    backgroundColor: '#444444',
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  numberText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto', // 버튼을 화면 하단에 정렬
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BinarySearch;
