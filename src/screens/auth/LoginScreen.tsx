import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LottieView from 'lottie-react-native';
import InputComponent from '../../components/InputComponent';
import { loginSchema } from '../../validations/authValidation';
import { login } from '../../assets/animations';
import Icon from 'react-native-vector-icons/FontAwesome';


const COLORS = {
  primary: '#4CAF50',
  error: 'red',
  textDark: '#333',
  textLight: '#666',
  textDefault: '#444',
  background: '#fff',
};

const FONT_SIZES = {
  title: 26,
  subtitle: 16,
  buttonText: 16,
  bottomText: 15,
  errorText: 12,
};

type FormData = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [secureText, setSecureText] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = async (data: FormData) => {
    try {
      console.log('Logging in with:', data);
      await AsyncStorage.setItem('USER_TOKEN', 'dummy_token');
      Alert.alert('Success', 'Logged in successfully');
      // navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LottieView source={login} autoPlay loop style={styles.lottie} />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputComponent
                label="Email"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                iconName="email"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <InputComponent
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={secureText}
                iconName="lock"
                error={errors.password?.message}
              />
            )}
          />
<View style={styles.forgotPasswordContainer}>
  <TouchableOpacity onPress={() => Alert.alert('Forgot Password pressed')}>
    <Text style={styles.forgotText}>Forgot Password?</Text>
  </TouchableOpacity>
</View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit(handleLogin)}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton} onPress={() => Alert.alert('Google Login')}>
  <View style={styles.googleContent}>
    <Icon name="google" size={20} color="#DB4437" style={styles.googleIcon} />
    <Text style={styles.googleText}>Continue with Google</Text>
  </View>
</TouchableOpacity>
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.bottomText, styles.signUpText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  toggleText: {
    textAlign: 'right',
    color: COLORS.primary,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.buttonText,
    fontWeight: '600',
  },
  forgotText: {
    color: COLORS.primary,
    textAlign: 'center',
    // marginTop: 14,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  bottomText: {
    fontSize: FONT_SIZES.bottomText,
    color: COLORS.textDefault,
  },
  signUpText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  lottie: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginBottom: -10,
  },
  googleButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    marginRight: 12,
  },
  googleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 4, 
    marginBottom: 8, 
  }, 
});
