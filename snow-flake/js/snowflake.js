let countSnowflake=400; //кількість сніжинок
let masSnowflake=[]; //масив сніжинок

//функція анімації
animeSnowflake=function(){
    for(var i=0; i<masSnowflake.length;i++){
        let t=Number.parseInt(masSnowflake[i].style.top)+Math.floor(Math.random()*3);
        if(t>window.innerHeight)t=-5;
        masSnowflake[i].style.top=t+'px';
        let l= (parseInt( masSnowflake[i].style.left )+Math.floor(Math.random() * (1 - -1 + 1)) + -1);
        if(l<-2)l=window.innerWidtg;
        if(l>window.innerWidth) l=-2;
        masSnowflake[i].style.left=l+'px';
    }
    requestAnimationFrame(animeSnowflake);
};

//створюємо кожну сніжинку(елемент)
for(var i=0; i<countSnowflake; i++){
	masSnowflake[i]=document.createElement('span');
	masSnowflake[i].innerText='*';
	masSnowflake[i].style.color='#00C1FF';
	masSnowflake[i].style.position='fixed';
	masSnowflake[i].style.top='-'+Math.floor(Math.random()*(window.innerHeight/1.2))+'px';
	masSnowflake[i].style.left=Math.floor(Math.random()*window.innerWidth)+'px';
	document.body.appendChild(masSnowflake[i]);
}

//перший запуск анімації
animeSnowflake();