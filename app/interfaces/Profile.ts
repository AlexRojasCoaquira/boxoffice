export interface TwoStepSettings {
  isTicketViewFirstTime: boolean;
  isFirstTime: boolean;
  onLogin: boolean;
  onEntryView: {
    enabled: boolean;
    frequency: string;
  };
}

export interface TwoStepVerify {
  enabled: boolean;
  isFirstTime: boolean;
  isEmailVerified: boolean;
  isEmailAlternativeVerified: boolean;
  isPhoneVerified: boolean;
  settings: TwoStepSettings;
}

export interface Profile {
  email: string;
  phoneCode: string;
  phone: number;
  contactEmail: string;
  twoStepVerify: TwoStepVerify;
}