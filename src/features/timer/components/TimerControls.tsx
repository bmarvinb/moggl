import { Button } from 'components/Button'
import { IconButton } from 'components/IconButton'
import { FC } from 'react'
import { BiPurchaseTag, BiDollar } from 'react-icons/bi'
import 'styled-components/macro'

export type TimerControlsProps = {
  onStartClicked: () => void
}

export const TimerControls: FC<TimerControlsProps> = props => {
  return (
    <div>
      <div
        css={`
          display: grid;
          grid-template-columns: 2rem 2rem 1fr;
          grid-column-gap: 0.5rem;
          align-items: center;
        `}
      >
        <IconButton
          aria-label="Select tags"
          css={`
            font-size: var(--fontSizeXl);
          `}
        >
          <BiPurchaseTag title="Select tags" />
        </IconButton>
        <IconButton
          aria-label="Change billable status"
          css={`
            font-size: var(--fontSizeXl);
          `}
        >
          <BiDollar title="Change billable status" />
        </IconButton>
        <Button
          aria-label="Start timer"
          title="Start timer"
          onClick={() => props.onStartClicked()}
        >
          Start
        </Button>
      </div>
    </div>
  )
}
