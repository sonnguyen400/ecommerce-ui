function Card({children}) {
    return ( <>
        <style type="text/css">{
            `
                .card{
                    border:none;
                }
            `
}</style>
<Card variant="flat">{children}</Card> 
    </>);
}

export default Card;