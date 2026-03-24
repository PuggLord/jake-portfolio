import { describe, it } from 'vitest'

describe('useCommandDispatch — Phase 4 command handlers', () => {
  // CONT-01
  it.todo('dispatching "about" sets activeModal to { type: "about", id: null } in store (CONT-01)')
  it.todo('dispatching "whoami" alias triggers same behavior as "about" (CONT-01)')
  // CONT-02
  it.todo('dispatching "projects" appends modal-link OutputItems for each project (CONT-02)')
  it.todo('dispatching "ls" alias triggers same behavior as "projects" (CONT-02)')
  it.todo('each modal-link item from projects has kind="modal-link" and modalType="project" (CONT-02)')
  // CONT-03
  it.todo('dispatching "blog" appends modal-link OutputItems for each post (CONT-03)')
  it.todo('dispatching "cat posts" compound alias triggers same behavior as "blog" (CONT-03)')
  it.todo('each modal-link item from blog has kind="modal-link" and modalType="post" (CONT-03)')
  // CONT-04
  it.todo('dispatching "contact" sets activeModal to { type: "contact", id: null } in store (CONT-04)')
  // CONT-05
  it.todo('dispatching "resume" sets activeModal to { type: "resume", id: null } in store (CONT-05)')
})
