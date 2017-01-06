import $ from 'jquery';
window.$ = $;
window.jQuery = $;
import rewardpool from "../../router/rewardpool.html";
import gamerule from "../../router/gamerule.html";
import ranking from "../../router/ranking.html";
import rewardlog from "../../router/rewardlog.html";
import prizemanager from "../../router/prizemanager.html";
import drawlog from "../../router/drawlog.html";

$(document).ready(function () {
    function Router() {
        this.routes = {};
        this.curUrl = '';

        this.route = function (path, callback) {
            this.routes[path] = callback || function () { };
        };

        this.refresh = function () {
            this.curUrl = location.hash.slice(1) || '/';
            $(`#navi-bar>li`).removeClass("active");
            if (this.curUrl.length > 1) {
                $(`#navi-${this.curUrl.slice(1)}`).addClass("active");
            } else {
                $(`#navi-rewardpool`).addClass("active");
            }
            this.routes[this.curUrl]();
        };

        this.init = function () {
            $(window).on('load', this.refresh.bind(this));
            $(window).on('hashchange', this.refresh.bind(this));
            $(window).on('unload', this.refresh.bind(this));
        }
    }

    var R = new Router();
    R.init();
    var res = $("#routerview");
    R.route('/', function () {
        res.html(rewardpool);
        $('#navi-rewardpool').trigger("rewardpoolEvent");
    });
    R.route('/gamerule', function () {
        res.html(gamerule);
        $('#navi-gamerule').trigger("gameruleEvent");
    });
    R.route('/ranking', function () {
        res.html(ranking);
        $('#navi-ranking').trigger("rankingEvent");
    });
    R.route('/rewardlog', function () {
        res.html(rewardlog);
        $('#navi-rewardlog').trigger("rewardlogEvent");
    });
    R.route('/prizemanager', function () {
        res.html(prizemanager);
        $('#navi-prizemanager').trigger("prizemanagerEvent");

    });
    R.route('/drawlog', function () {
        res.html(drawlog);
        $('#navi-drawlog').trigger("drawlogEvent");
    });

    R.refresh();
})