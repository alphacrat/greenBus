const CustomButton = ({ onClick, children, className }) => {
    const buttonClassName = `custom-button ${className || ''}`
    return (
        <button className={buttonClassName} onClick={onClick}>
            {children}
        </button>
    );
};

export default CustomButton;