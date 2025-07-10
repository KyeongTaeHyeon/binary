let newsList = [];

let LoadData = () => {
    fetch('../data/news.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            newsList = data;
            console.log(newsList);
        });
};

LoadData();
