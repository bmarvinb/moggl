import { createMachine } from 'xstate'

type SidebarContext = {}

type SidebarEvent = {
  type: 'TOGGLE'
}

export const sidebarMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SwJYTAIwIYCcB0A9gA5gB2AxACoDyA4rQDICiioRBqALigaayAA9EATjwAWAKwBGKRIBMEgGwAOKWIDMy4QBoQAT0RTlABjzqA7BOPG5y1cfU2Avk92p02fAGMANh0hUdIwsSCDsXDx8oUII6ma25soJxmKKSubqcroGCHJy4ibCyirCxsrm5nLq6i6uIKQE6PCh7pi4hCRRbBwo3Lz8MQC0anFyRcKKDvI2xlLm2SJiZopSs+rCjinCwnIubmht3n6wkPzhvZEDhkl4lvIKiWIyEhYLCMJL6itrG9Zi27s6q1PGcen0uoJEMNFOY8GMtJN1NM5LN5voof88FZKsJEmoVtVzLUnEA */
  createMachine<SidebarContext, SidebarEvent>({
  id: 'sidebar',
  states: {
    open: {
      on: {
        TOGGLE: {
          target: 'closed',
        },
      },
    },
    closed: {
      on: {
        TOGGLE: {
          target: 'open',
        },
      },
    },
  },
})
