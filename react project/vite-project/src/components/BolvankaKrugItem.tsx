interface IBolvankaKrugItem{
    textContent:string;
}

const BolvankaKrugItem:React.FC<IBolvankaKrugItem> = ( {textContent} ) => {
    return (
        <div>
            {textContent}
        </div>
    );
};

export default BolvankaKrugItem;