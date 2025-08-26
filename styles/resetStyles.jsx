import { StyleSheet } from 'react-native';

export const resetStyles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetText: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  emailInput: {
    width: '92%',
    maxWidth: 420,
    height: 52,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(2,6,23,0.08)',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 14,
  },
  resetBtnContainer: {
    width: '92%',
    maxWidth: 420,
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 14,
    elevation: 6,
    marginTop: 4,
    marginBottom: 16, // give space so link isn't crowded/hidden
  },
  resetBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  backToLoginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,        // ensure it sits above background graphics
  },
  backToLogin: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white', // high contrast
    textAlign: 'center',
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1.5,
  },
});
