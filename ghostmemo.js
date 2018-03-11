
var c=[],sel,t0;

// create cards
for(var j=0;j<4;j++)for(var i=0;i<4;i++) {
  
  var q = f_create('div','card flip');
  var f1 = f_create('figure',"front");
  var f2 = f_create('figure',"back");
  
  //f1.innerText = j+' '+i;
  q.append(f1);
  q.append(f2);
  q.onclick = f_flip;
  q.setAttribute( 'cardid', j*4+i );
  
  document.body.append(q);
  
  // card object
  c[j*4+i] = {
    card: q,
    id: j*4+i,
    back: -1,
    sel: 0,
    time: 0
  };
}

info.onclick = function() {

  info.className = 'card flip';
  f_newGame();
  
}

function f_newGame() {

  var i,a=[],x,y,k;
  
  // cards
  for(i=0;i<8;i++)
    a[i*2] = a[i*2+1] = i;
   
  // shake shake shake
  for(i=0;i<50;i++)
    x = f_rnd(16),
    y = f_rnd(16),
    k = a[x], a[x] = a[y], a[y] = k;
  
  // save
  for(i=0;i<16;i++)
    c[i].back = a[i]+1,
    c[i].card.childNodes[1].className = 'back g' + c[i].back;
    
  setTimeout( function(){
    for(var i=0;i<16;i++) {
      c[i].card.className = 'card';
      c[i].sel = 0;
    }
    t0=+new Date();
  }, 2000 );
  
}
f_newGame();


// flip card
//
function f_flip() {

  var self = this;
  var cardid = self.getAttribute('cardid');
  var time = +new Date();
  
  if(c[cardid].sel||c[cardid].time>time)
    return;
  
  if(!sel) {
    // first card
    c[cardid].sel = 1;
    sel = c[cardid];
  }else {
    // second card
    if(sel.back==c[cardid].back) {
      // true
      sel = void 0;
      c[cardid].sel = 1;
      f_gameover();
    }else {
      // false
      c[cardid].time = +new Date() + 1300;
      setTimeout( _bflip,800 );
    }
  }

  self.className = 'card flip';
  
  function _bflip() {
    self.className = 'card';
  }
}

function f_gameover() {

  for(var i=0,j=0;i<16;i++)
    if(c[i].sel) j++;
  
  if(j==16) {
    var sc = ~~((+new Date()-t0)/100);
    score.innerText = ~~(sc/10) + '.' + sc%10 + ' sec';
    info.className = 'card';
  }
  
}

function f_create(t,c) {
  z = document.createElement(t);
  z.className = c;
  return z;
}

function f_rnd(r) {
  return ~~(Math.random()*r)
}