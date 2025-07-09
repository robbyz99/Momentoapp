# Morning Momentum App - Wireflow & Functional Specification

## App Overview
**Purpose**: A mobile-first PWA for morning mindfulness and productivity priming using neuroscience-based behavioral design
**Target Device**: iPhone (mobile-optimized)
**Flow**: Linear progression through 6 core sections with bottom navigation for flexibility

---

## Screen Specifications

| Screen | Purpose | Core UI Elements | User Actions | Navigation From | Navigation To |
|--------|---------|------------------|--------------|----------------|---------------|
| **Welcome Screen** | Sets motivational tone, shows progress, displays daily affirmation | • Sunrise gradient header<br>• Daily affirmation (rotating)<br>• Streak tracker ("Day X of showing up")<br>• User stats (total completions)<br>• Large "Start Your Day" button<br>• Motivational power phrase | • Tap "Start Your Day" button<br>• Read daily affirmation<br>• View streak progress | • App launch<br>• Bottom navigation<br>• Completed flow return | • Breathing & Gratitude |
| **Breathing & Gratitude** | Calm the mind, set positive intention through breathing and gratitude | • 3-cycle breathing animation<br>• Sunrise gradient background<br>• Breathing instruction text<br>• Gratitude prompts<br>• Progress indicator (cycle count)<br>• "Continue" button | • Follow breathing animation<br>• Engage with gratitude prompts<br>• Tap "Continue" when ready | • Welcome Screen<br>• Bottom navigation | • Timer Section |
| **Timer Section** | Focused meditation/breathing session with customizable duration | • Circular SVG progress indicator<br>• Timer display (2-5 minutes)<br>• Play/pause controls<br>• Duration selection buttons<br>• Motivational messaging<br>• "Next" button (post-completion) | • Select timer duration<br>• Start/pause timer<br>• Complete meditation session<br>• Tap "Next" to continue | • Breathing & Gratitude<br>• Bottom navigation | • Morning Checklist |
| **Morning Checklist** | Capture daily intentions, goals, and physical wellness commitments | • Sunrise gradient header<br>• Identity statement input<br>• Feeling check-in textarea<br>• Starter action input + suggestion button<br>• "Why today matters" textarea<br>• Habit replacement input<br>• Physical wellness checkboxes (water, light, movement)<br>• "Complete Morning Setup" button | • Fill text inputs<br>• Tap "Need ideas?" for suggestions<br>• Check physical wellness boxes<br>• Submit form<br>• Navigate between fields | • Timer Section<br>• Bottom navigation | • Micro-Visualization |
| **Micro-Visualization** | Brief guided visualization to reinforce daily intentions | • 15-second countdown timer<br>• Motivational visualization prompts<br>• Sunrise gradient background<br>• Progress indicator<br>• "Continue to Reflection" button | • Engage with visualization<br>• Wait for 15-second completion<br>• Tap "Continue" | • Morning Checklist<br>• Bottom navigation | • Reflection Section |
| **Reflection Section** | End-of-day reflection and gratitude practice | • Reflection prompt cards<br>• "What did I do well?" textarea<br>• "How did I embody my identity?" textarea<br>• "What am I grateful for?" textarea<br>• "Save Reflection" button<br>• Historical reflection access | • Fill reflection inputs<br>• Submit reflection<br>• Review past reflections<br>• Complete daily cycle | • Micro-Visualization<br>• Bottom navigation<br>• Any time during day | • Welcome Screen (cycle complete) |

---

## Navigation System

### Bottom Navigation Bar
**Purpose**: Provides quick access to any section while maintaining progress
**Elements**: 
- Home (Welcome)
- Breathe (Breathing & Gratitude) 
- Timer (Timer Section)
- Plan (Morning Checklist)
- Visualize (Micro-Visualization)
- Reflect (Reflection Section)

**Behavior**: 
- Always visible (fixed bottom)
- Active section highlighted
- Touch-friendly icons with labels
- Compact design for mobile

---

## User Flow Patterns

### Primary Flow (Linear)
```
Welcome → Breathing & Gratitude → Timer → Morning Checklist → Micro-Visualization → Reflection → [Complete]
```

### Flexible Access
- Users can jump to any section via bottom navigation
- Progress is auto-saved at each step
- Incomplete sections are visually indicated

---

## Data Persistence Points

| Screen | Data Saved | Storage Method |
|--------|------------|---------------|
| Welcome | Daily affirmation, view timestamp | localStorage |
| Breathing & Gratitude | Completion status | Database |
| Timer | Completion status, duration used | Database |
| Morning Checklist | All form inputs, completion flags | Database |
| Micro-Visualization | Completion status | Database |
| Reflection | All reflection text, date | Database |

---

## Visual Design System

### Color Palette
- **Primary**: Warm sunrise gradients (peach, orange, soft pink)
- **Background**: Soft warm white (#fefefe)
- **Text**: Dark gray (#374151) for readability
- **Accent**: Green (#10b981) for completion states

### Typography
- **Headers**: Bold, 24px+ for section titles
- **Body**: 16px for optimal mobile reading
- **Labels**: 14px for form fields
- **Navigation**: 12px for tab labels

### Spacing
- **Sections**: 24px padding
- **Cards**: 16px internal padding
- **Elements**: 12px between related items
- **Bottom Navigation**: 80px height for thumb accessibility

---

## Interactive Elements

### Buttons
- **Primary**: Large, rounded, gradient backgrounds
- **Secondary**: Outline style for less prominent actions
- **Suggestion**: Small, rounded, green accent for "Need ideas?"

### Form Fields
- **Text Areas**: Auto-resize, placeholder text
- **Checkboxes**: Large touch targets
- **Validation**: Real-time feedback

### Animations
- **Breathing**: Smooth scale/fade animations
- **Transitions**: 200ms ease-in-out between sections
- **Celebrations**: Confetti on major completions

---

## Technical Specifications

### Responsive Breakpoints
- **Mobile**: 320px - 768px (primary)
- **Tablet**: 768px+ (secondary support)

### Performance
- **Loading**: Skeleton screens during data fetch
- **Offline**: Service worker for basic functionality
- **PWA**: Full home screen installation support

### Accessibility
- **Touch Targets**: Minimum 44px
- **Contrast**: WCAG AA compliant
- **Screen Readers**: Proper ARIA labels
- **Focus Management**: Keyboard navigation support

---

## Future Enhancement Areas

### AI Integration Points
- **Welcome**: Personalized affirmations based on history
- **Checklist**: Smart starter action suggestions
- **Reflection**: Deeper insight prompts
- **Analytics**: Progress pattern recognition

### Additional Features
- **Streak Recovery**: Gentle encouragement for missed days
- **Customization**: User-defined routine modifications
- **Export**: Progress data export capabilities
- **Sharing**: Optional progress sharing features