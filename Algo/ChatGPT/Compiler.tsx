import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Base64} from 'js-base64';

const Compiler = ({exampleCode}: {exampleCode: string}) => {
  const [code, setCode] = useState('');
  const [languageId, setLanguageId] = useState(71); // Default to Python
  const [output, setOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Set code when exampleCode changes
  useEffect(() => {
    setCode(exampleCode);
  }, [exampleCode]);

  const handleCompile = async () => {
    try {
      const response = await fetch(
        'https://judge0-ce.p.rapidapi.com/submissions',
        {
          method: 'POST',
          headers: {
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'x-rapidapi-key':
              '준성이 지갑', // Replace 'YOUR_RAPIDAPI_KEY' with your actual RapidAPI key
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            source_code: code,
            language_id: languageId,
          }),
        },
      );
      const responseData = await response.json();
      const submissionId = responseData.token;

      // Polling for submission status
      let status: string = 'Queue';
      while (status !== 'Accepted' && status !== 'Compilation Error') {
        const statusResponse = await fetch(
          `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}?base64_encoded=true`,
          {
            headers: {
              'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
              'x-rapidapi-key':
                '준성이 지갑', // Replace 'YOUR_RAPIDAPI_KEY' with your actual RapidAPI key
              'content-type': 'application/json',
            },
          },
        );
        const statusData = await statusResponse.json();
        status = statusData.status.description;
        if (status === 'Queue') {
          // Add any loading indicator here if needed
        }
        if (status === 'Accepted') {
          setOutput(Base64.decode(statusData.stdout));
          setErrorMessage('');
        } else if (status === 'Compilation Error') {
          setOutput('');
          setErrorMessage(statusData.compile_output);
        } else {
          // Add any other handling for different statuses here if needed
        }
        // Add some delay before polling again
        await new Promise<void>(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred during compilation.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Enter your code here..."
        value={code} // exampleCode를 TextInput에 표시
        onChangeText={text => setCode(text)}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={languageId}
          style={styles.picker}
          onValueChange={itemValue => setLanguageId(itemValue)}>
          <Picker.Item label="Python" value={71} />
          <Picker.Item label="C" value={50} />
          <Picker.Item label="Java" value={62} />
        </Picker>
      </View>
      <Button title="Compile" onPress={handleCompile} />
      <ScrollView style={styles.outputContainer}>
        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : (
          <Text style={styles.output}>{output}</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  input: {
    height: 200,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    color: '#fff',
  },
  outputContainer: {
    flex: 1,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
  },
  output: {
    fontSize: 16,
    color: '#fff',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  pickerContainer: {
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
  },
  picker: {
    color: '#fff',
  },
});

export default Compiler;
