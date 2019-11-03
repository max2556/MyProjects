function customAlert(title, msg, button_text){
    var styles = {
        main:"position: absolute; top: 40%; left: 30%; background: #00b118; color: white; font-family: Tahoma; border-radius: 10px; padding: 10px; width: 400px",
        header:"font-size: 24px; margin: 5px;",
        message:"margin: 5px;",
        button: "color: inherit; background: #005f30; outline: none; padding: 5px; border: 1px solid #00ad57; border-radius: 5px;",
    }
    button_text = (button_text == undefined) ? "Ok" : button_text; //странное выражение со странным названием, но работает, как if
    title = (title == undefined) ? "The page says:" : title; //Странное выражение 2
    //для каждого элемента создаем... эээ... элемент 
    var div_main = document.createElement('div'); //div_main = html элемент div
    var div_header = document.createElement('div');
    var message = document.createElement('p');
    var button = document.createElement('button');

    div_main.style = styles.main; // присваиваем стили
    div_main.id = 'custom_alert'; //даем id на всякий случай

    div_header.style = styles.header;
    div_header.innerText = title;

    message.style = styles.message;
    message.innerText = msg;

    button.style = styles.button;
    button.innerText = button_text;
    button.onclick =  function(e){  //даем кнопке функцию, которая удаляет наш alert
        e.target.parentElement.remove(); //event направлен на кнопку, родитель которой div_main
    }
    //упаковываем заголовок - header(title), сообщение, кнопку в div_main
    div_main.appendChild(div_header);
    div_main.appendChild(message);
    div_main.appendChild(button);

    document.body.append(div_main); //а div_main упаковываем в body
}