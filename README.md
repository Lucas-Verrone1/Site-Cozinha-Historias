@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lora:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Stack+Sans+Headline:wght@200..700&display=swap');
* {
    margin: 0;
    padding: 0;
}

#body { 
    font-family: Montserrat;
    font-size: 16px;
    background-color:  #fffeee;
}

#header {
    background-color: #86463f;
    width: 100%;
    font-family: Lato;
    color: #ffffff;
    display: flex;
    justify-content: space-between; 
    align-items: center;
}

.h1-header { 
    color: #fffeed;
    margin: 0; 
    padding: 20px;
}

.navigation {   
    padding: 25px; 
}

.menu {
    text-decoration: none;
    color: #ffffff;
    margin-left: 15px; 
    font-family: Montserrat;
}

.menu:hover {
    color: #5e0004;
    background-color: #fffeee;
    transition: 0.5s;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
}

.sections {
    justify-content: center;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    width: 100%;
    box-shadow: #000000 0px 4px 10px;
    border-radius: 20px;
}

.h1-section1 {
    color: #86463f;
    font-family: Lora;
    font-size: 40px;
}

.p-section1 {
    width: 50%;
    color: #5e0004;
    padding: 10px;
    margin: 10px;
}

.link-section1 {
    text-decoration: none;
    color: #5e0004;
    padding: 10px;
    margin: 10px;
}

.link-section1:hover {
    color: #fffeed;
    background-color: #86463f;
    border-radius: 10px;
    transition: 0.5s;
}

.h1-card{
    color: #5e0004;
    font-family: Montserrat;
    font-size: 32px;
    text-align: center;
}

.h2-card{
    color: #5e0004;
    font-family: Montserrat;
    font-size: 23px;
    text-align: center;
}

.sections-2 {
    justify-content: center;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    width: 100%;
    box-shadow: #000000 0px 4px 10px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
}

.card{
    width: 30%;
    box-sizing: border-box;
    box-shadow: 0 4px 5px #000000;
    border-radius: 10px;
    padding: 0;
    margin: 20px;
}

.card:hover{
    margin: 30px;
    transition: 0.5s;
}

.lista-card {
    text-align: center;
    list-style: none;
}

.img-card{
    width: 100%;
    height: 50%;  
    border-radius: 14px;
}

