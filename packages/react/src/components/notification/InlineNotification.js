import { styled } from '../../stitches.config'
import { Paragraph } from '@/components/typography'
import { Flex } from '@/components/layout'

export const InlineNotification = ({
    title = 'Notification title',
    description,
    type = 'neutral',
    withShadow = false,
}) => {
    return (
        <InlineNotificationWrapper type={type} withShadow={withShadow}>
            <div className='icon'></div>
            <Flex direction='column' gap='2'>
                <Paragraph context='interface'><strong>{title}</strong></Paragraph>
                <Paragraph context='interface'>{description}</Paragraph>
            </Flex>
        </InlineNotificationWrapper>
    )
}

const InlineNotificationWrapper = styled('aside', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: '$3',
    padding: '$5',
    borderRadius: '$4',
    borderWidth: '1px',
    borderStyle: 'solid',

    [`& ${Paragraph}`]: {
        color: '$textPrimary',
        marginBottom: '0',
    },

    '.icon': {},

    variants: {
        type: {
            neutral: {
                background: '$grayscale200',
                borderColor: '$grayscale700',
            },
            warning: {
                background: '$backgroundCaution',
                borderColor: '$borderCaution',
            },
            error: {
                background: '$backgroundCritical',
                borderColor: '$borderError',
            },
            success: {
                background: '$backgroundPositive',
                borderColor: '$borderPositive',
            },
            informational: {
                background: '$backgroundInfo',
                borderColor: '$borderInfo',
            },
        },
        withShadow: {
            true: {
                boxShadow: '$base',
            }
        }
    },

    defaultVariants: {
        type: 'neutral',
        withShadow: false,
    }
})