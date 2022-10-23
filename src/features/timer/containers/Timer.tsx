import { useActor } from '@xstate/react';
import { Box } from 'common/components/Box';
import { Input } from 'common/components/Input';
import { TimerControls } from 'features/timer/components/TimerControls';
import { useTimerMode } from 'features/timer/hooks/useTimerMode';
import { useTimerMachine } from 'features/timer/machines/TimerMachineProvider';
import { NewTimeEntryModel } from 'features/timer/models/time-entries';
import * as O from 'fp-ts/lib/Option';

export type TimerProps = {
  newTimeEntry: O.Option<NewTimeEntryModel>;
};

export const Timer = (props: TimerProps) => {
  const service = useTimerMachine();
  const [timerState, timerSend] = useActor(service);
  const [timerMode, setTimerMode] = useTimerMode();

  const onStartClicked = () => {
    timerSend({ type: 'START', start: new Date().toISOString() });
  };

  const onStopClicked = () => {
    timerSend('STOP');
  };

  const isLoading =
    timerState.matches('creating') ||
    timerState.matches('saving') ||
    timerState.matches('discarding');

  const isRunning =
    timerState.matches('running') || timerState.matches('creating');

  return (
    <Box
      css={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        padding: '0.75rem 1rem',
        boxShadow: '$md',
        background: '$timerBg',
        position: 'relative',
        zIndex: 1,

        '@md': {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }}
    >
      <Box
        css={{
          flex: 1,
        }}
      >
        <Input
          variant={'inline'}
          css={{
            width: '100%',
          }}
          placeholder={
            timerMode === 'timer'
              ? 'What are you working on?'
              : 'What have you done?'
          }
          value={timerState.context.timeEntry.description}
          onChange={e =>
            timerSend({
              type: 'UPDATE_TIME_ENTRY',
              data: { description: e.target.value },
            })
          }
          onBlur={e =>
            timerSend({
              type: 'SAVE_TIME_ENTRY',
            })
          }
        />
      </Box>
      <Box>
        <TimerControls
          duration={timerState.context.duration}
          loading={isLoading}
          running={isRunning}
          onDiscard={() => timerSend('DISCARD')}
          mode={timerState.context.mode}
          onStartClicked={onStartClicked}
          onStopClicked={onStopClicked}
          onTimerModeChanged={() => {
            setTimerMode(timerMode === 'manual' ? 'timer' : 'manual');
          }}
          onAddTimeEntryClicked={() => {
            console.log('time entry clicked');
          }}
        />
      </Box>
    </Box>
  );
};
