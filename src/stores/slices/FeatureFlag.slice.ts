import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeatureFlagState } from '@/stores/sliceTypes/FeatureFlag.type';
import { useAppSelector } from '@/stores/store.hooks';

export const initialFeatureFlagState: FeatureFlagState = {
  isSmsEnabled: false,
  isNavBarSearchEnabled: false,
  isBillingEnabled: false,
  isProfileSettingsEnabled: false,
  isOnboardingHeaderEnabled: true,
};

export const featureFlagSlice = createSlice({
  name: 'featureFlagSlice',
  initialState: initialFeatureFlagState,
  reducers: {
    setFeatureFlags: (state, action: PayloadAction<FeatureFlagState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const featureFlagSelector = () => useAppSelector((store) => store.featureFlag);

export const { setFeatureFlags } = featureFlagSlice.actions;

export default featureFlagSlice.reducer;
