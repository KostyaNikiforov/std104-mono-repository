class Card {
    constructor(title, description, image, url) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.link = url;
    }
}

const cards = [
    new Card(
        "Multistrada V4 RS",
        "Multistrada V4 RS - це мотоцикл, який поєднує в собі найкращі характеристики для тих, хто шукає максимальну продуктивність та спортивний характер. Він оснащений потужним двигуном V4, який забезпечує неймовірну швидкість та відмінну керованість. Цей мотоцикл створений для тих, хто хоче відчути адреналін на дорозі та насолоджуватися кожною миттю їзди.",
        "https://ducati.ua/assets/images/multistrada-v4-rs/multistrada-v4-rs-icon.png",
        "https://ducati.ua/motocikli/multistrada/multistrada-rs.html"
    ),
    new Card(
        "Multistrada V4 Pikes Peak",
        "Multistrada V4 Pikes Peak - це спеціальна версія мотоцикла, створена для тих, хто прагне досягти вершини на найвідомішій гірській трасі світу - Pikes Peak. Цей мотоцикл оснащений потужним двигуном V4, який забезпечує неймовірну швидкість та відмінну керованість. Він також має спеціальні налаштування підвіски та аеродинамічні елементи, які допомагають йому долати круті повороти та підйоми на трасі Pikes Peak.",
        "https://ducati.ua/assets/images/multistrada_v4s_pikespeak/multistrada-v4-pp-icon.png",
        "https://ducati.ua/motocikli/multistrada/multistrada-v4-pikes-peak.html",
    ),
    new Card(
        "Multistrada V4 S",
        "Multistrada V4 S створений для тих, хто хоче з комфортом досліджувати всі стежки, не поступаючись спортивним характером, який вирізняє кожен мотоцикл, виготовлений у Борго Панігале. Більш потужний, ефективний та технологічно просунутий, він підсилює ваші враження від їзди, підкреслюючи задоволення від подорожі в кожній своїй деталі.",
        "https://ducati.ua/assets/images/multistrada_v4s/multistrada-v4s-icon.png",
        "https://ducati.ua/motocikli/multistrada/multistrada-v4-s.html"
    )
];

const cardsContainer = document.createElement("div");
cardsContainer.classList.add("cards");
document.body.appendChild(cardsContainer);

cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("id", `card-${index + 1}`);

    cardElement.addEventListener("click", () => {
        console.log(`Card: "${card.title}" with id: "${cardElement.id}" is clicked!`);

        cardElement.classList.toggle("card--active");

        setTimeout(() => {
            cardElement.classList.remove("card--active");
        }, 300);
    });

    const titleElement = document.createElement("h2");
    titleElement.textContent = card.title;

    cardElement.appendChild(titleElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = card.description;
    cardElement.appendChild(descriptionElement);

    const imageElement = document.createElement("img");
    imageElement.src = card.image;
    imageElement.alt = card.title;
    imageElement.classList.add("card__image");
    cardElement.appendChild(imageElement);

    const linkElement = document.createElement("a");
    linkElement.href = card.link;
    linkElement.textContent = "Read more";
    cardElement.appendChild(linkElement);

    cardsContainer.appendChild(cardElement);
});

const totalNumberOfCharactersInCard = cards.reduce((total, card) => {
    return total + card.title.length + card.description.length + card.link.length;
}, 0);

cards.sort((a, b) => b.title.localeCompare(a.title));

console.log("Sorted cards: ", cards);

cards.filter(card => card.title.includes("RS")).forEach(card => {
    console.log("Card with 'RS' in title: ", card);
});

console.log("Array with only titles: ", cards.map(card => card.title));


const class1 = {
    func1: () => {
        console.log("Function 1");
    }
}

class1.func1();