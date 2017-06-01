/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-route/app-location.html","74de228313a07e2e657eb98c16788caa"],["/bower_components/app-route/app-route-converter-behavior.html","c5d76631af30c2de417baec672168673"],["/bower_components/app-route/app-route.html","13ed76d6aabae79aa7274a96a25ee47d"],["/bower_components/font-roboto/roboto.html","8b9218ffd40ebb430e7f55674cf55ffd"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","032ddccbe04fadf233db599b63b171b9"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","db18aab5d2e81d8e9d9268e6ecf72bfa"],["/bower_components/iron-behaviors/iron-button-state.html","f608432e0ef66742454913f50cc3f604"],["/bower_components/iron-behaviors/iron-control-state.html","31c7774a1ca49ee9d50d8986c257b329"],["/bower_components/iron-fit-behavior/iron-fit-behavior.html","a5e5e58ed51d76348233db0d8a379790"],["/bower_components/iron-flex-layout/iron-flex-layout.html","98b146deb732ef9180e750a024541d35"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","79266ae6cc24b57c344710155176ff8f"],["/bower_components/iron-icon/iron-icon.html","800370dcfb6957282b10c6b32c1e2e47"],["/bower_components/iron-icons/iron-icons.html","b06b48bbd24e44ce5f592c008e254376"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","a48dab906bc6c0f357bf5b1a6b6fb52d"],["/bower_components/iron-input/iron-input.html","666c2afb6370b18dfdbb19b4c040ebe1"],["/bower_components/iron-location/iron-location.html","1d5efb93f4e9786005319eb8e1ec648c"],["/bower_components/iron-location/iron-query-params.html","8f3f8cf693637171b6280d8a141b9a69"],["/bower_components/iron-menu-behavior/iron-menu-behavior.html","4303fc21652f987c5b05d65a34b3aa71"],["/bower_components/iron-meta/iron-meta.html","b07992bdde833d48eb5893bc6c0b40bc"],["/bower_components/iron-overlay-behavior/iron-focusables-helper.html","56f23fd131a2e370e3d039d5dab5b743"],["/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","3cd60a5c696ae2383b22c809b0d2f532"],["/bower_components/iron-overlay-behavior/iron-overlay-behavior.html","7227fe9e747518edb9676d3d5bce48ff"],["/bower_components/iron-overlay-behavior/iron-overlay-manager.html","5b2d2cca3fe0e5c9ce09ea141ba6d78d"],["/bower_components/iron-pages/iron-pages.html","1e409876eb152c1c3e0c6efb29358e71"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","277ad201cd03267a4610b25121caca32"],["/bower_components/iron-selector/iron-multi-selectable.html","ef1891f34c77b21c01c480ab28c743de"],["/bower_components/iron-selector/iron-selectable.html","45b4259e868c47f85f2ced7d3337fd03"],["/bower_components/iron-selector/iron-selection.html","d38a136db111dc594d0e9b27c283a47a"],["/bower_components/iron-selector/iron-selector.html","fd5fa9e6f3bf894b065f43d2711bba45"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","1129bf5593ece9189962e470025ab759"],["/bower_components/neon-animation/neon-animatable-behavior.html","a0e4868750147e67dcd56b5ac5535eab"],["/bower_components/neon-animation/neon-animation-runner-behavior.html","18473ad3e5442f9ede7cb7864d7371a2"],["/bower_components/paper-behaviors/paper-button-behavior.html","1e6e9794c87cb389d4191911ec554890"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","ed51cc379e55570173529cd58ca00b59"],["/bower_components/paper-button/paper-button.html","a2db7b5c134887e57b85092f80a222be"],["/bower_components/paper-dialog-behavior/paper-dialog-behavior.html","54478f6a1ccec11fc3be244d599e9692"],["/bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","a097e252ec22fb5fb39a3cd489ecf9af"],["/bower_components/paper-dialog/paper-dialog.html","5727db2a30e623ce6a0c9608e3478597"],["/bower_components/paper-fab/paper-fab.html","8578afb025d244ab4679e1b0086225ca"],["/bower_components/paper-input/paper-input-addon-behavior.html","1df8488740f18fbc9475c50474637392"],["/bower_components/paper-input/paper-input-behavior.html","7de1fdfda7adf018983d2ee3f68f271f"],["/bower_components/paper-input/paper-input-char-counter.html","d2a83aeb9f9a4b76a7f64ebe1d0cee82"],["/bower_components/paper-input/paper-input-container.html","ef6dcdf499c8cadecdda95e806b0e63e"],["/bower_components/paper-input/paper-input-error.html","21a8f66e4674f671f2be3818a089781a"],["/bower_components/paper-input/paper-input.html","878a61533c7967f9d1de4a057b3558c3"],["/bower_components/paper-item/paper-item-behavior.html","e8eebea30adc0d64efc784080d6ab6f7"],["/bower_components/paper-item/paper-item-shared-styles.html","3d5a964eaef867703865c972c2ea67c8"],["/bower_components/paper-item/paper-item.html","8b7df3b56961d3cacb94271bcbd3f65a"],["/bower_components/paper-listbox/paper-listbox.html","a11c350f73beaa39a53238fb5977d9a8"],["/bower_components/paper-material/paper-material-shared-styles.html","53507362c2b3d2ad2879475ba0578f83"],["/bower_components/paper-ripple/paper-ripple.html","9be0bea4c0ee964df2b113790575dd3b"],["/bower_components/paper-styles/color.html","676564d6f830197d333a4f4c2f6ebaca"],["/bower_components/paper-styles/default-theme.html","f34560e7b2fde3ec06e135a47a83056f"],["/bower_components/paper-styles/shadow.html","a42c9ee6919674abb5de48fe4364295a"],["/bower_components/paper-styles/typography.html","4ffc8e5a0a957686d7bf4a9c3110ba18"],["/bower_components/paper-toolbar/paper-toolbar.html","defaab27a6b958ec239c8da055ef6fe1"],["/bower_components/polymer/polymer-micro.html","9bf11a9db081b3ec18b81273125b2273"],["/bower_components/polymer/polymer-mini.html","b22f4c983047b07bf3a0b844b1f55250"],["/bower_components/polymer/polymer.html","46a09aa7af6b69d1c2eb4b1c8bb3ce31"],["/bower_components/webcomponentsjs/webcomponents-lite.js","761d3811879eb6cd7944c123045f93a3"],["/index.html","ef3a47cb19cc229878d2bcc215fb71de"],["/src/show-app/show-app.html","1cbe1abdde0a3f2981239b756e11b173"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function(body) {
        // new Response() is happy when passed either a stream or a Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
                               dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
        return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
                                          ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
        .split('&') // Split into an array of 'key=value' strings
        .map(function(kv) {
            return kv.split('='); // Split each 'key=value' string into a [key, value] array
        })
        .filter(function(kv) {
            return ignoreUrlParametersMatching.every(function(ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
            });
        })
        .map(function(kv) {
            return kv.join('='); // Join each [key, value] array into a 'key=value' string
        })
        .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
};


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function(item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function(requests) {
        return requests.map(function(request) {
            return request.url;
        });
    }).then(function(urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return setOfCachedUrls(cache).then(function(cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
                        // If we don't have a key matching url in the cache already, add it.
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, {credentials: 'same-origin'});
                            return fetch(request).then(function(response) {
                                // Bail out of installation unless we get back a 200 OK for
                                // every request.
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function(responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        }).then(function() {

            // Force the SW to transition from installing -> active state
            return self.skipWaiting();

        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activate');
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.keys().then(function(existingRequests) {
                return Promise.all(
                    existingRequests.map(function(existingRequest) {
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function() {

            return self.clients.claim();

        })
    );
});


self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetch');
    if (event.request.method === 'GET') {
        // Should we call event.respondWith() inside this fetch event handler?
        // This needs to be determined synchronously, which will give other fetch
        // handlers a chance to handle the request if need be.
        var shouldRespond;

        // First, remove all the ignored parameters and hash fragment, and see if we
        // have that URL in our cache. If so, great! shouldRespond will be true.
        var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
        shouldRespond = urlsToCacheKeys.has(url);

        // If shouldRespond is false, check again, this time with 'index.html'
        // (or whatever the directoryIndex option is set to) at the end.
        var directoryIndex = 'index.html';
        if (!shouldRespond && directoryIndex) {
            url = addDirectoryIndex(url, directoryIndex);
            shouldRespond = urlsToCacheKeys.has(url);
        }

        // If shouldRespond is still false, check to see if this is a navigation
        // request, and if so, whether the URL matches navigateFallbackWhitelist.
        var navigateFallback = '';
        if (!shouldRespond &&
            navigateFallback &&
            (event.request.mode === 'navigate') &&
            isPathWhitelisted([], event.request.url)) {
            url = new URL(navigateFallback, self.location).toString();
            shouldRespond = urlsToCacheKeys.has(url);
        }

        // If shouldRespond was set to true at any point, then call
        // event.respondWith(), using the appropriate cache key.
        if (shouldRespond) {
            event.respondWith(
                caches.open(cacheName).then(function(cache) {
                    return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
                        if (response) {
                            return response;
                        }
                        throw Error('The cached response that was expected is missing.');
                    });
                }).catch(function(e) {
                    // Fall back to just fetch()ing the request if some unexpected error
                    // prevented the cached response from being valid.
                    console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                    return fetch(event.request);
                })
            );
        }
    }
});