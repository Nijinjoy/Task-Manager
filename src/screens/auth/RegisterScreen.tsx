import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../validations/authValidation';
import register from '../../assets/animations/register.json';

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [secureText, setSecureText] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const handleRegister = (data: FormData) => {
    console.log('Registering:', data);
  };

  const handleSignInNavigation = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
<KeyboardAvoidingView
  style={styles.keyboardAvoidingContainer}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={Platform.select({
    ios: 100, 
    android: 0,
  })}
>
        <ScrollView
 contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.animationContainer}>
            <LottieView 
              source={register} 
              autoPlay 
              loop 
              style={styles.lottie} 
            />
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                  {errors.fullName && (
                    <Text style={styles.errorText}>{errors.fullName.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                      style={styles.passwordInput}
                      secureTextEntry={secureText}
                      returnKeyType="done"
                    />
                    <TouchableOpacity 
                      onPress={() => setSecureText(!secureText)}
                      style={styles.visibilityToggle}
                    >
                      <Icon
                        name={secureText ? 'visibility' : 'visibility-off'}
                        size={22}
                        color="#777"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password.message}</Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleSubmit(handleRegister)}
              activeOpacity={0.9}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignInNavigation}>
              <Text style={[styles.bottomText, styles.signInText]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },  
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 30 : 60,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  lottie: {
    width: 180,
    height: 180,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 52,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fafafa',
    height: 52,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  visibilityToggle: {
    padding: 8,
    marginRight: -8,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#4CAF50',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  bottomText: {
    fontSize: 16,
    color: '#666',
  },
  signInText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});
