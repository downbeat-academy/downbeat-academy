import { 
    SandpackProvider,
    SandpackLayout,
    SandpackPreview,
    SandpackThemeProvider,
    SandpackCodeEditor,
} from '@codesandbox/sandpack-react'
import { CodePreviewProps } from './types'

const CodePreview = ({
    code,
    template = 'react'
}: CodePreviewProps ) => {
    return (
        <SandpackProvider 
            template={template}
            customSetup={{
                dependencies: {
                    "@downbeat-academy/cadence-core": "latest",
                    "@downbeat-academy/cadence-tokens": "latest",
                    "@downbeat-academy/cadence-icons": "latest",
                }
            }}
            files={{'/App.js': `${code}`
            }}
        >
            <SandpackThemeProvider>
                <SandpackLayout>
                    <SandpackCodeEditor />
                    <SandpackPreview />
                </SandpackLayout>
            </SandpackThemeProvider>
        </SandpackProvider>
    )
}

export type { CodePreviewProps }
export { CodePreview }