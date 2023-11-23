interface ISVGClose{
    onClick: () => void;

}

const CloseSVG:React.FC<ISVGClose> = ({onClick}) => {
    return (
        <div  onClick={onClick}>
            <svg  hanging='25px' width='25px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

        </div>
    );
};

export default CloseSVG;