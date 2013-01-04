/****************************
 *
 * Link Object {
 *   url,
 *   title,
 *   num_clicks,
 *   type,
 *   isPopular,
 *   date_added
 * }
 * Meh
 *
 ***************************/

var mongo = require('mongodb')
  , Db = mongo.Db
  , Connection = mongo.Connection
  , Server = mongo.Server
  , BSON = mongo.BSON
  , ObjectID = mongo.ObjectID
  ;


var LINK_TYPES = {
  NEWS:     'news',
  BLOG:     'blog',
  SPORT:    'sport',
  RADIO_TV: 'radio_tv'
};

// Create a connection to mongoDB
LinkProvider = function(host, port) {
  var server = new Server(host, port, {});

  this.db = new Db('gooyand-app', server, {w: 1});
  this.db.open(function(err, db) {
    if(err)
      console.log('ERROR ' + e);
  });
};


LinkProvider.prototype = {

  // To import links... maybe automatic later?
  // Simple scrapping with jQuery on gooya.com:
  //
  // $(function() {
  //  var sets  = $('a[target="_blank"]');
  //  var links = [];
  //
  //  sets.each(function(i, link) {
  //    var link = $(link);
  //    if(link.siblings('img').length)
  //      links.push({url: link.attr('href'), title: link.html(), num_clicks:0});
  //  });
  // });
  importLinks: function(callback) {
    var links = [
      {url:"http://www.varzesh3.com/", title:"Varzesh3", num_clicks: 0, type: LINK_TYPES.SPORT},
      {url:"http://fc-perspolis.com/", title:"Perspolis", num_clicks: 0, type: LINK_TYPES.SPORT},
      {url:"http://www.persianleague.com/", title:"Persian League", num_clicks: 0, type: LINK_TYPES.SPORT},
      {url:"http://www.parsfootball.com/", title:"Parsfootball", num_clicks: 0, type: LINK_TYPES.SPORT},
      {url:"http://www.jehanevarzesh.com", title:"Jahane Varzesh", num_clicks: 0, type: LINK_TYPES.SPORT},
      {url:"http://iransport24.com/", title:"Iransport24", num_clicks: 0, type: LINK_TYPES.SPORT},
      {url:"http://www.goal.com/iran", title:"Goal.com", num_clicks: 0, type: LINK_TYPES.SPORT},
      {url:"http://footballitarin.com/", title:"Footballitarin", num_clicks: 0, type: LINK_TYPES.SPORT},
      {url:"http://www.esteghlaltehranfc.com/", title:"Esteghlal", num_clicks: 0, type: LINK_TYPES.SPORT},
      {url:"http://www.navad.net/", title:"90 Newspaper", num_clicks: 0, type: LINK_TYPES.SPORT},
      {url:"http://seyedmojtaba-vahedi.blogspot.com/", title:"Vahedi, Mojtaba", num_clicks: 0, type: LINK_TYPES.BLOG},
      {url:"http://www.rezapahlavi.org/", title:"Pahlavi, Reza", num_clicks: 0, type: LINK_TYPES.BLOG},
      {url:"http://nurizad.info/", title:"Nurizad, Mohammad", num_clicks: 0, type: LINK_TYPES.BLOG},
      {url:"http://www.asgharagha.com", title:"Khorsandi, Hadi", num_clicks: 0, type: LINK_TYPES.BLOG},
      {url:"http://babakdad.blogspot.fr/", title:"Dad, Babak", num_clicks: 0, type: LINK_TYPES.BLOG},
      {url:"http://www.nourizadeh.com", title:"Dr Nourizadeh", num_clicks: 0, type: LINK_TYPES.BLOG},
      {url:"http://www.masoudbehnoud.com", title:"Behnoud, Masoud", num_clicks: 0, type: LINK_TYPES.BLOG},
      {url:"http://www.bbehbudi.com", title:"Behbudi, Behruz", num_clicks: 0, type: LINK_TYPES.BLOG},
      {url:"http://masihalinejad.com/", title:"Alinejad, Masih", num_clicks: 0, type: LINK_TYPES.BLOG},
      {url:"http://www.tehrooz.com/", title:"Tehran Emrooz", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.tabnak.ir", title:"Tabnak", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.sarkhat.com/", title:"Sarkhat", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.1oo1nights.org/", title:"Shahrzad News", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://shahrvand.com/", title:"Shahrvand", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.sahamnews.net/", title:"Sahamnews", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.roozonline.com/", title:"Rooz", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.resalat-news.com", title:"Resalat", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://rajanews.com/", title:"Rajanews", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.rahesabz.net", title:"Rahesabz", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://rahedigar.net/", title:"Rahedigar", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.presstv.ir/", title:"Press TV", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.peykeiran.com", title:"PeykIran", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.pendar.net/", title:"Pendar", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.pyknet.net/", title:"Peiknet", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.parsine.com/", title:"Parsine", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://norooznews.org/", title:"Norooz", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://my.gooya.com/", title:"My gooya", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.musicema.com", title:"Musicema", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.mojnews.com/", title:"Moj News", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.mizankhabar.net/", title:"MizanPress", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.mihan.net/", title:"Mihan", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://memarinews.com", title:"Memari News", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://melimazhabi.com/", title:"MelliMazhabi", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.mehrnews.com", title:"Mehr News", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://mashreghnews.ir", title:"Mashregh News", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.mardomsalari.com", title:"Mardomsalari", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://mardomreport.net", title:"Mardomreport", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.mardomak.org/", title:"Mardomak", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://marde-rooz.com/", title:"Marde Rooz", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://ir.mondediplo.com/", title:"Le Monde Diplom.", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.khodnevis.org/", title:"Khodnevis", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.lenziran.com/", title:"Lenziran", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://khaandaniha.com/", title:"Khandaniha", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://khabaronline.ir", title:"Khabaronline", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.kayhanlondon.com/", title:"Kayhan (London)", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.kayhannews.ir/", title:"Kayhan", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.kaleme.com/", title:"Kalameh", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.jomhourieslami.com/", title:"Jomhourie Eslami", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.jamejamonline.ir", title:"Jamejamonline", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://jahannews.com/", title:"Jahan News", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.jadidonline.com/", title:"Jadid Online", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.isna.ir/", title:"ISNA", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.irna.ir/", title:"IRNA", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.irinn.ir/", title:"IRINN", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.iribnews.ir/", title:"IRIB", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.irdiplomacy.ir", title:"IRDiplomacy", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.iranpressnews.com", title:"Iran Press News", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://iranonlin.com/", title:"Iranonline", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.iranian.com", title:"Iranian.com", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.irangreenvoice.com/", title:"Iran Green Voice", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://iran-emrooz.net/", title:"Iran Emrooz", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.irandarjahan.net/", title:"Irandarjahan", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.iran-newspaper.com/", title:"Iran", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.ilna.ir/", title:"ILNA", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.humanrights-ir.org/", title:"Humanrights-ir", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.hamshahrionline.ir/", title:"Hamshahri", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://news.gooya.com/", title:"Gooya News", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.foroneiran.com/", title:"For One Iran", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.fozoolemahaleh.com/", title:"Fozoolemahaleh", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.farsnews.net", title:"Fars News", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.farheekhtegan.ir/", title:"Farheekhtegan", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.shafaf.ir/", title:"Shafaf", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://fardanews.com/", title:"Farda -", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.fararu.com", title:"Fararu", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.etemaad.ir", title:"Etemaad", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.entekhab.ir/", title:"Entekhab", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://enghelabe-eslami.com/", title:"Enghelab Eslami", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.emruznews.com", title:"Emrouz", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.ebtekarnews.com/", title:"Ebtekar", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.donya-e-eqtesad.com/", title:"Donyaye Eqtesad", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://news.gooya.com/didaniha/", title:"Didaniha (gooya)", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.dw-world.de/dw/0,,641,00.html", title:"Deutsche Welle", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.digarban.com/", title:"Digarban", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.chn.ir/", title:"CHN", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.we-change.org/", title:"Change for Equality", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://caffecinema.com/", title:"Caffecinema", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://bamdadkhabar.com/", title:"Bamdadkhabar", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://balatarin.com/", title:"Balatarin", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.bbc.co.uk/persian/", title:"BBCpersian.com", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://baztab.net/", title:"Baztab", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.asriran.com", title:"Asr Iran", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.ariansteel.com/", title:"Arian Steel", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.aryanews.com", title:"Arya News", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://alef.ir/", title:"Alef", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.alarabiya.net/fa_default.html", title:"Al Arabiya", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.akhbar-rooz.com/", title:"Akhbar-e rouz", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://www.aftabnews.ir", title:"Aftabnews", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://advar-news.biz", title:"Advar News", num_clicks: 0, type: LINK_TYPES.NEWS},
      {url:"http://radiozamaneh.com/", title:"Zamaneh", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.voanews.com/persian", title:"VOA", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://irantvradio.com/", title:"Tv+Radio Online", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.roozvideo.com/", title:"Rooz Video", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://radioneda.wordpress.com/", title:"Radio Neda", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://persianfilm.net/", title:"Persian Film", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.voinews.net", title:"Pars TV", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://radiokoocheh.com/", title:"Radio Koocheh", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.radiojavan.com/", title:"Radio Javan", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.radis.org/", title:"Radio Israel", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.radiofarda.com/", title:"Radio Farda", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://live.irib.ir", title:"IRIB", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.glwiz.com/homepage.aspx", title:"GLWIZ", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.rfi.fr/fichiers/Langues/rfi_persan_main.asp", title:"France-RFI", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://persian.euronews.net/news/streaming-live/", title:"EuroNews TV", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://channelonetv.com/", title:"Channel 1 TV", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.bia2.com", title:"Bia2.com", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.bbc.co.uk/persian/tv/", title:"BBC TV ", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.bahrammoshiri.com/home/?page=video_archieve", title:"Bahram Moshiri ", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.asraneh.net", title:"Asraneh PodCast", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://andisheh.tv/", title:"Andisheh TV", num_clicks: 0, type: LINK_TYPES.RADIO_TV},
      {url:"http://www.670amkirn.com/", title:"670 AM - KIRN", num_clicks: 0, type: LINK_TYPES.RADIO_TV}];

    this.collection(function(err, collection) {
      if(err)
        console.log(err);
      else {
        collection.insert(links, function(err, links) {
          if(err)
            console.log(err);
        });
      }
    });
  }

  // Return db collection
  ,collection: function(callback) {
    this.db.collection('links', function(err, collection) {
      if(err)
        callback(err);
      else
        callback(null, collection);
    });
  }

  // Return all links ordered by name
  ,findAll: function(callback) {
    this.collection(function(err, collection) {
      if(err)
        callback(err);
      else {
        collection.find({}, {sort: {title: 1}}).toArray(function(err, results) {
          if(err)
            callback(err);
          else
            callback(null, results);
        });
      }
    });
  }

  // Find all links and sort based on type and group by their title's first letter
  // ex: retArray['news']['a'] = [{obj1}, {obj2}]
  ,findAllSortedByType: function(callback) {
    this.collection(function(err, collection) {
      if(err)
        callback(err);
      else {
        collection.find({}, {sort: {title: 1}}).toArray(function(err, results) {
          if(err)
            callback(err);
          else {
            var retArray = {};
            results.forEach(function(link) {
              if(retArray[link.type] === undefined) {
                retArray[link.type] = {};
              }

              var letter = link.title.charAt(0).toLowerCase();
              if(retArray[link.type][letter] === undefined) {
                retArray[link.type][letter] = []
              }

              retArray[link.type][letter].push(link);
            });

            callback(null, retArray);
          }
        });
      }
    });
  }

  // Find all links by type
  ,findByType: function(type, callback) {
    this.collection(function(err, collection) {
      if(err)
        callback(err);
      else {
        collection.find({type: type}, {sort: {title: -1}}).toArray(function(err, results) {
          if(err)
            callback(err);
          else
            callback(null, results);
        });
      }
    });
  }

  // increment click count
  // TODO cap click count / minute / IP
  ,addClick: function(id, ip, callback) {
    this.collection(function(err, collection) {
      if(err)
        callback(err);
      else {
        collection.update({ _id: new ObjectID(id)}, { $inc: {num_clicks: 1}}, {upsert: false, safe:true}, function(err) {
          if(err)
            callback(err);
          else {
            callback(null);
          }
        });
      }
    });
  }
};

//new LinkProvider('localhost', 27017).importLinks();

// Exports
exports.LinkProvider = LinkProvider;
exports.LINK_TYPES = LINK_TYPES;