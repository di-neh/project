interface ISVGDotsMenu{
    onClick: () => void;
}

const SVGDotsMenu:React.FC<ISVGDotsMenu> = ({onClick}) => {
    return (
        <div onClick={onClick}>
            <svg id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <g fill="#9b9b9b">
                    <path d="m32 12c2.45 0 4.5 2.04 4.5 4.5 0 2.45-2.05 4.5-4.5 4.5s-4.5-2.05-4.5-4.5c0-2.46 2.05-4.5 4.5-4.5z"></path>
                    <path d="m32 27.5c2.45 0 4.5 2.04 4.5 4.5 0 2.45-2.05 4.5-4.5 4.5s-4.5-2.05-4.5-4.5c0-2.46 2.05-4.5 4.5-4.5z"></path>
                    <path d="m32 43c2.45 0 4.5 2.04 4.5 4.5 0 2.45-2.05 4.5-4.5 4.5s-4.5-2.05-4.5-4.5c0-2.46 2.05-4.5 4.5-4.5z"></path>
                </g>
            </svg>
        </div>
    );
};

export default SVGDotsMenu;