import { CardBody, CardContainer, CardFooter  } from "./CardStyled";

export function Card(props) {
    return (
        <CardContainer>
            <CardBody>
                <div>
                    <h2>{props.title}</h2>
                    <p>{props.text}</p>
                </div>
                <img src={props.banner} alt="imagem"/>
            </CardBody>
           
           <CardFooter>
                <div>
                    <i className="bi bi-heart"></i>
                    <span>{props.likes}</span>
                </div>
                
                <div>
                    <i className="bi bi-chat-dots"></i>
                    <span>{props.comments}</span>
                </div>
           </CardFooter>
        </CardContainer>
    )
}