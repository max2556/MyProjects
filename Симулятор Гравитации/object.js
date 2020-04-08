class object{
    constructor(x,y,r,w,v,name,color){
        name == undefined? this.name = simple_name() : this.name = name;
        color == undefined? this.color = random_color() : this.color = color;
        this.weight = w;
        this.radius = r;
        this.cords = 
        {
            x: x, y:y
        };
        this.velocity = v;
    }
    update(){
        for (let i = 0; i < objects_list.length; i++) {
            let element = objects_list[i];
            if (element != this) {
                matrix_sum(this.velocity, getAcceleration(this, element));   
            } 
        }
        this.cords.x -= this.velocity[0];
        this.cords.y -= this.velocity[1];
    }
    draw(ctx){
        
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.cords.x, this.cords.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}