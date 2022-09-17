import { InlineInput, Input } from 'components/Input'
import { TimerControls } from 'features/timer/components/TimerControls'
import 'styled-components/macro'

export const Timer = () => {
  const onStartClicked = () => {
    console.log('start')
  }

  return (
    <div
      css={`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        padding: 1rem 1rem;
        box-shadow: var(--shadowMd);
        background: var(--neutral0);
        z-index: 1;
      `}
    >
      <div
        css={`
          flex: 1;
          margin-right: 1rem;
        `}
      >
        <InlineInput
          css={`
            width: 100%;
          `}
          placeholder="What are you working on?"
        />
      </div>
      <div>
        <TimerControls onStartClicked={onStartClicked} />
      </div>
    </div>
  )
}
