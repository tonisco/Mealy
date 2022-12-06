import { NavigationContainer } from '@react-navigation/native'
import OnboardingNavigator from './navigation/onboarding/OnboardingNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <OnboardingNavigator />
    </NavigationContainer>
  );
}
