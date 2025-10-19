# Screen Transition Animations

## Overview
This implementation adds smooth zoom-in/zoom-out animations when navigating between the index screen and other tab screens.

## Animation Behavior

### From Index → Other Screens
- **Effect**: Gentle Zoom In then Settle
- **Duration**: 1000ms total (600ms zoom in + 400ms settle)
- **Easing**: Quadratic easing for smooth, natural feel
- **Scale**: 0.3 → 1.1 → 1.0 (gentler zoom)
- **Opacity**: 0 → 1 (500ms)

### From Other Screens → Index
- **Effect**: Gentle Zoom In then Zoom Out (reverse)
- **Duration**: 800ms total (300ms zoom in + 500ms zoom out)
- **Easing**: Quadratic easing for smooth, natural feel
- **Scale**: 1.0 → 1.1 → 0.3 (gentler zoom)
- **Opacity**: 1 → 0 (600ms)

### Between Non-Index Screens
- **Effect**: No animation (instant transition)
- This provides a smooth experience when navigating between content screens

## Implementation Details

### Components
- `AnimatedScreenWrapper.tsx`: Main animation wrapper component
- Uses React Navigation's `useFocusEffect` to trigger animations
- Leverages React Native Reanimated for smooth 60fps animations

### Usage
Each screen is wrapped with `AnimatedScreenWrapper`:
```tsx
<AnimatedScreenWrapper screenName="aboutme">
  {/* Screen content */}
</AnimatedScreenWrapper>
```

### Animation Timing (Updated for Smoothness)
- **Entry Zoom Phase**: 600ms with `Easing.out(Easing.quad)`
- **Entry Settle Phase**: 400ms with `Easing.inOut(Easing.quad)`
- **Exit Zoom Phase**: 300ms with `Easing.in(Easing.quad)`
- **Exit Fade Phase**: 500ms with `Easing.in(Easing.quad)`
- **Opacity Transitions**: 500-600ms for smooth fading

## Screens with Animations
- ✅ About Me (`aboutme`)
- ✅ Projects (`projects`)
- ✅ Internships (`internship`)
- ✅ Work Experience (`workexp`)
- ✅ Testimonials (`testimonials`)
- ✅ Contact (`contact`)
- ❌ Index (`index`) - No wrapper needed (source screen)

## Performance
- Uses `useSharedValue` and `useAnimatedStyle` for optimal performance
- Animations run on the UI thread (60fps)
- Minimal re-renders during transitions
- **Loading screens removed** to prevent interference with animations

## Changes Made
- ✅ Removed loading states from all screens except testimonials (which loads real data)
- ✅ Removed CosmicLoader imports from all screens
- ✅ Cleaned up unused useEffect timers
- ✅ Animations now start immediately when screens are focused