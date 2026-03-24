import { describe, it } from 'vitest'

describe('Modal', () => {
  // WIND-04
  it.todo('pressing Escape key closes the modal (WIND-04)')
  it.todo('clicking backdrop overlay closes the modal (WIND-04)')
  it.todo('clicking [x] button closes the modal (WIND-04)')
  it.todo('onClose callback is called when modal closes (WIND-04)')
  // WIND-04 + ACCS-03
  it.todo('Tab key cycles focus to next focusable element within panel (WIND-04, ACCS-03)')
  it.todo('Shift+Tab cycles focus to previous focusable element within panel (WIND-04, ACCS-03)')
  it.todo('focus cannot leave modal panel while modal is open (WIND-04, ACCS-03)')
  // ACCS-03
  it.todo('modal panel has role="dialog" (ACCS-03)')
  it.todo('modal panel has aria-modal="true" (ACCS-03)')
  it.todo('modal panel has aria-labelledby pointing to title element id (ACCS-03)')
  it.todo('close button has aria-label="Close modal" (ACCS-03)')
  it.todo('close button has min touch target 44x44 via min-h-[44px] min-w-[44px] classes (ACCS-03)')
  it.todo('no outline:none on modal interactive elements — focus indicators are visible (ACCS-03)')
})
