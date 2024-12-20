const Category = require('../models/Category');
const Banner = require('../models/Banner');
const Product = require('../models/Product');

const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');


class SiteController    {
    
    // [GET] / 
    index(req, res, next) {        
        
        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch   {
            user = '';
        }

        var smallBanner;
        var bigBanner;
        var trendingProd;
        var listCategories;
        Banner.find({type: 'big' })
        .then(banners => {
            bigBanner = mutipleMongooseToObject(banners);
        })
        .catch(next);

        Banner.find({type: 'small' })
        .then(banners => {
            smallBanner = mutipleMongooseToObject(banners);
        })
        .catch(next);

        Category.find({})
            .then(categories => {
                listCategories = mutipleMongooseToObject(categories);
            })
            .catch(next);

        Product.find({})
            .then(products => {
                res.render('home',
                    {
                        categories: listCategories,
                        bigBanner: bigBanner,
                        smallBanner: smallBanner,
                        trendingProd: mutipleMongooseToObject(products),
                        user: user,
                    })
            })

        // Product.find({})
        // .then(products => {
        //     trendingProd = mutipleMongooseToObject(products);
        //     console.log(trendingProd);
        // })
        // .catch(next);

        // Category.find({})
        //     .then(categories => {
        //         res.render('home', { 
        //             categories: mutipleMongooseToObject(categories),
        //             banners1: banner1,
        //             banners2: banner2,
        //             trendingProd: trendingProd,
        //             user: user,
        //          })
        //     })
        //     .catch(next);

        
    }

    // [GET] /search
    search(req,res)  {
        res.render('search');
    }

    // [GET] /csbh
    csbh(req, res)  {
        res.render('csbh', 
                {
                    layout: 'site',
                    title: 'Chính sách bảo hành',
                    val: 'csbh'});
    }

    category(req, res)  {
        var trendingProd;
        
        var user;
        try {
            user = mongooseToObject(res.locals.user);
        }
        catch   {
            user = '';
        }

        Product.find({})
        .then(products => {
            trendingProd = mutipleMongooseToObject(products);
            res.render(
                'category',
                {
                    layout: 'site2',
                    title: 'Danh mục',
                    val: 'category',
                    user: user,
                    trendingProd: trendingProd,
                });
        })
        
        // res.render(
        //     'category',
        //     {
        //         layout: 'site2',
        //         title: 'Danh mục',
        //         val: 'category',
        //         user: user,
        //         trendingProd: trendingProd,
        //     });
    }   

    // [GET] /search
    logout(req, res)    {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    }
}

module.exports = new SiteController;