import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Clipboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 추가

// 챗지피티 3.5 터보 API 키
const API_KEY = '준성이 지갑';
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

// OpenAI API와의 통신하여 AI 응답 가져오는 함수
const getAIResponse = async (prompt, language) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
        top_p: 1,
        temperature: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        stop: ['[STOP]'],
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'No response';
    return aiResponse;
  } catch (error) {
    console.error('오류 발생!', error);
    return 'Failed to get AI response';
  }
};

const CodeGenerate = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('C');
  const [exampleCode, setExampleCode] = useState('');
  const navigation = useNavigation(); // 네비게이션 훅 사용

  const generateExampleCode = async () => {
    try {
      const prompt = `이진탐색 알고리즘의 ${selectedLanguage} 언어 구현을 생성해주세요. 코드는 다음과 같습니다.`;
      const aiResponse = await getAIResponse(prompt, selectedLanguage);
      setExampleCode(aiResponse);
    } catch (error) {
      console.error('Error generating example code:', error);
      setExampleCode('Failed to generate example code');
    }
  };

  const navigateToCompiler = () => {
    navigation.navigate('Compiler', { exampleCode });
  };

  const copyExampleCode = () => {
    Clipboard.setString(exampleCode);
    alert('예제 코드가 클립보드에 복사되었습니다.');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topButtons}>
          <Button title="컴파일" onPress={navigateToCompiler} />
        </View>
        <View style={styles.languageSelection}>
          <Text style={styles.languageText}>프로그래밍 언어:</Text>
          <Picker
            selectedValue={selectedLanguage}
            style={{ height: 50, width: 150 }}
            onValueChange={itemValue => setSelectedLanguage(itemValue)}>
            <Picker.Item label="C" value="C" />
            <Picker.Item label="JAVA" value="JAVA" />
            <Picker.Item label="Python" value="Python" />
          </Picker>
        </View>
        <View style={styles.exampleCodeContainer}>
          <View style={styles.exampleCodeHeader}>
            <Text style={styles.exampleCodeTitle}>예시 코드</Text>
            <Button title="복사" onPress={copyExampleCode} />
          </View>
          <ScrollView>
            <Text style={styles.exampleCodeText}>{exampleCode}</Text>
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.bottomButtons}>
        <Button title="예제코드 생성" onPress={generateExampleCode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // 다크 모드: 배경색 검은색
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  languageSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  languageText: {
    marginRight: 10,
    fontSize: 17,
    color: '#FFF',
  },
  exampleCodeContainer: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 20, // 수정된 부분
  },
  exampleCodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exampleCodeTitle: {
    fontWeight: 'bold',
    borderColor: '#17b6c4',
    color: '#FFF',
  },
  exampleCodeText: {
    color: '#FFF',
  },
  topButtons: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '75%', // 너비 조정
  },
});

export default CodeGenerate;
