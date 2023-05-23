export default interface IModalProps {
    show: boolean
    close: () => void
    children: React.ReactNode
}