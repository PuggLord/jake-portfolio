import type React from 'react'
import { useTerminalStore } from '../../store/terminal'
import Modal from './Modal'
import AboutModal from './AboutModal'
import ContactModal from './ContactModal'
import ResumeModal from './ResumeModal'
import ProjectModal from './ProjectModal'
import PostModal from './PostModal'
import { projects } from '../../content/projects'
import { posts } from '../../content/posts'

interface Props {
  inputRef: React.RefObject<HTMLInputElement | null>
}

export default function ModalRouter({ inputRef }: Props) {
  const activeModal = useTerminalStore((s) => s.activeModal)
  const setActiveModal = useTerminalStore((s) => s.setActiveModal)

  if (!activeModal) return null

  function close() {
    setActiveModal(null)
    inputRef.current?.focus()
  }

  if (activeModal.type === 'about') {
    return <Modal title="about jake manis" onClose={close}><AboutModal /></Modal>
  }
  if (activeModal.type === 'contact') {
    return <Modal title="contact" onClose={close}><ContactModal /></Modal>
  }
  if (activeModal.type === 'resume') {
    return <Modal title="resume" onClose={close}><ResumeModal /></Modal>
  }
  if (activeModal.type === 'project' && activeModal.id) {
    const project = projects.find((p) => p.slug === activeModal.id)
    if (!project) return null
    return <Modal title={project.name} onClose={close}><ProjectModal project={project} /></Modal>
  }
  if (activeModal.type === 'post' && activeModal.id) {
    const post = posts.find((p) => p.slug === activeModal.id)
    if (!post) return null
    return <Modal title={post.title} onClose={close}><PostModal post={post} /></Modal>
  }
  return null
}
