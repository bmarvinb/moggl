import { createMachine } from 'xstate'

type SidebarContext = {}

type SidebarEvent = {
  type: 'TOGGLE.SIDEBAR'
}

export const sidebarMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SwJYTAIwIYCcB0YAHgA5YB26EAxACoDyA4gwDICieAygJIAirAQgEEASolDEA9qgAuKCWTEhCiALQBWNQE48AZgAMOnQCYALAEYdAdk0mrAGhABPRGYAceM3r1qzANj2a+nqWRjoAvmEOqOjY+ADGEgA2iVjEsJC0jCzs3HxCokggkjJyCoXKCCrGeJpaNkaWPiY+gQ7OCEbuWnrNmt5qPT7eEVFomLh4CcmpqGRQVISw0ljSYHhYAGarOAAUnl4AlFTR4-FJKWkoc4rFKLLyihUqnV1mmq6BOpr+rjoabYgGpZdPsTEYvGZbIYRiATrECCRyBArvNFstVustmBdvs9Ec4RMiKQKCiblI7qVHqo-tpfnozG4tCZNAz7E5VGY1MC1EYGTydL59Ly1BFIiAyBJ0PBCgT8ESkZAySUHuVVMy1HhQj19DoTLY1L8AZU-Do8PzLDr9CZXDyRWLZZNzjNFYVbvcyqAniY8I0DHpfr93sy9UaGmZdMFmkZfL41DHfDCHVMLrMoEqKSrPao1NU+r5XOCBjHajpQwWagKmTpXAzXImxvD5STrq7ye6qZVedpNI09QHNDZXL4TEaVCazaFLOZfO9LK553bRjFcOn26rKgbTZbTBZrLZLKPQhqfODoyYeg0bHaIkA */
  createMachine<SidebarContext, SidebarEvent>({
    context: {},
    id: 'sidebar',
    initial: 'expanded',
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
