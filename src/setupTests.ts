// portfolio/src/setupTests.ts
import * as matchers from '@testing-library/jest-dom/matchers'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
expect.extend(matchers)
afterEach(() => { cleanup() })

// jsdom does not implement scrollIntoView — mock it globally so Terminal's
// TerminalOutput auto-scroll useEffect does not throw in tests.
window.HTMLElement.prototype.scrollIntoView = () => {}
