# Cadence Design System

Design system and component library for the Cadence design system. Built and developed by Downbeat Academy to accelerate the development of new applications and products empower music education.

Find out more information about Downbeat Academy [here](https://downbeatacademy.com).

See usage and documentation in the Cadence [Storybook](https://cadence.downbeatacademy.com) instance.

## Built with

- [NextJS starter](https://nextjs.org/)
- TypeScript
- [Stitches styled library](https://stitches.dev/)
- [Radix component primitives](https://www.radix-ui.com/)
- [Storybook](https://storybook.js.org/)

## Beta status

This library is still in Beta, star it on Github to stay informed on updates. Here's the current status and tasks that are in progress to make this library production-ready for Downbeat Academy.

- Inputs and data handling
- Checkbox and radio buttons
- Status badge
- Music notation rendering
- Feedback and notifications
- Button grouping

Cadence Design System is open source, if you want to contribute reach out! Downbeat Academy and the Cadence Design System are labors of love for me, but I hope to expand the footprint, content, and product offering of Downbeat Academy to reach more musicians, students, and educators to help them advance as creators.

# Installing & Usage

Install using your package manager of choice.

```
// yarn
 yarn add cadence-design-system

 // npm
 npm install cadence-design-system
```

Import individual components as named imports:

```
import { Button, Flex, Paragraph } from 'cadence-design-system'

export default function Page() {
    return (
        <Flex>
            <Paragraph>This is a button.</Paragraph>
            <Button onClick={() => console.log('You clicked the button!')}>Click the button</Button>
        </Flex>
    )
}
```

## Styling

Cadence Design System uses Stitches by default for styling and is currently tied to Downbeat Academy brand foundations and styling by default. I'm working to make the styling more library-agnostic and allow custom styling of components.
