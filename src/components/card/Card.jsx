export function Card({news}) {
    return (
        <section>
            <h1>{news.title}</h1>
            <p>{news.text}</p>
            <img src={news.img} alt="imagem"/>
            <i className="bi bi-heart"></i>
            <span>{news.likes}</span>
            <i className="bi bi-chat-dots"></i>
            <span>{news.comments}</span>
        </section>
    )
}