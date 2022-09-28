import { createMachine } from 'xstate'

type SidebarContext = {}

type SidebarEvent = {
  type: 'TOGGLE.SIDEBAR'
}

export const sidebarMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SwJYTAIwIYCcB0YAHgA5YB26EAxACoDyA4gwDICieAygJIAirAQgEEASolDEA9qgAuKCWTEhCiALQB2NQEY8AJgCsAZh0AGAByaAbMYsBOG6YA0IAJ6IdOvJpvWALJvMWPmpWejoAvmFOqOjY+ADGEgA2iVjEsJC0jCzs3HxCokggkjJyCoXKCOpauobuNj6hxgbNTq6V7qaeJgamemp6mprWmj4RkSBkEujwhdGYuAQk5JSKxSiy8ooVKno+Fnhmxja7mmo+NhY6mq2qmu54wZbGajoWzcb+o+NzsXgJyal0hBVlJ1qUtqobAY1HgDOc1MY9KZkVokTdKncPI8rC83gYPqYvlE0PMcCCSptypCLNo4TYEUiUZo0S5VPjjJ4zBY9HYmnY9GMwkA */
  createMachine<SidebarContext, SidebarEvent>({
  context: {},
  id: 'sidebar',
  initial: 'collapsed',
  states: {
    expanded: {
      on: {
        'TOGGLE.SIDEBAR': {
          target: 'collapsed',
        },
      },
    },
    collapsed: {
      on: {
        'TOGGLE.SIDEBAR': {
          target: 'expanded',
        },
      },
    },
  },
})