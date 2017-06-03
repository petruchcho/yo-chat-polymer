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

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","824d6b871a858135700b7735e73193b3"],["/bower_components/app-layout/app-drawer/app-drawer.html","c56ae1297324c962360ebe45b19f45b0"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","971d4deb6ba3b40262fb13100c236a25"],["/bower_components/app-layout/app-header/app-header.html","320079d531ef602329dff321e4833734"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","78b0ae3dace93c047903cd1885d35150"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","f9af3b19ba0df5aea027b835f0d4e766"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","0d375fa44800f0d196034e6a6240a5c3"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","f3f0a1ef72443548681e08410ef8cac2"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","45ac7838ae5551c41616a25f7a1f1ae6"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","db1405dd5694b43cfce35d2522ab9825"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","48795db4cf5b8a18cc66a976e1337a87"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","13bd1ea458aa7e2eae6b9906f5a17e5c"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","a50af0d3b7b87d87f13aeb8abf049815"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","fc264386961547372bf200ad129c8852"],["/bower_components/app-layout/helpers/helpers.html","0a1031655fe51a08071ff044e603214b"],["/bower_components/app-route/app-location.html","74de228313a07e2e657eb98c16788caa"],["/bower_components/app-route/app-route-converter-behavior.html","c5d76631af30c2de417baec672168673"],["/bower_components/app-route/app-route.html","2c012f3848f98d3164228ad9c2742b5a"],["/bower_components/font-roboto/roboto.html","8b9218ffd40ebb430e7f55674cf55ffd"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","032ddccbe04fadf233db599b63b171b9"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","db18aab5d2e81d8e9d9268e6ecf72bfa"],["/bower_components/iron-behaviors/iron-button-state.html","9fb410eb4dd2cf074011b4d7565fe520"],["/bower_components/iron-behaviors/iron-control-state.html","31c7774a1ca49ee9d50d8986c257b329"],["/bower_components/iron-fit-behavior/iron-fit-behavior.html","35bb347fbeed620a921bdb93c40363f4"],["/bower_components/iron-flex-layout/iron-flex-layout.html","d2c815e6a919f6da94ce3649e6e9aa87"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","79266ae6cc24b57c344710155176ff8f"],["/bower_components/iron-icon/iron-icon.html","800370dcfb6957282b10c6b32c1e2e47"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","a48dab906bc6c0f357bf5b1a6b6fb52d"],["/bower_components/iron-input/iron-input.html","c534697639484286f9cd62bf3bb6929d"],["/bower_components/iron-location/iron-location.html","1d5efb93f4e9786005319eb8e1ec648c"],["/bower_components/iron-location/iron-query-params.html","8f3f8cf693637171b6280d8a141b9a69"],["/bower_components/iron-media-query/iron-media-query.html","b17f5807fd96603b8832cd2ee931cc40"],["/bower_components/iron-meta/iron-meta.html","b07992bdde833d48eb5893bc6c0b40bc"],["/bower_components/iron-overlay-behavior/iron-focusables-helper.html","b935952337df172121dae50aa75d0ff6"],["/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","a70e5917cb2f5bb64e53e44b2f0cd764"],["/bower_components/iron-overlay-behavior/iron-overlay-behavior.html","7227fe9e747518edb9676d3d5bce48ff"],["/bower_components/iron-overlay-behavior/iron-overlay-manager.html","dfcf04b2b9b17dceb9176c5d4a1233b8"],["/bower_components/iron-pages/iron-pages.html","1e409876eb152c1c3e0c6efb29358e71"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","cadf39c81d35ff214b8356e1033fd7a0"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","2f3022f33f535f03fa652b016b18aa8d"],["/bower_components/iron-selector/iron-multi-selectable.html","ef1891f34c77b21c01c480ab28c743de"],["/bower_components/iron-selector/iron-selectable.html","45b4259e868c47f85f2ced7d3337fd03"],["/bower_components/iron-selector/iron-selection.html","d38a136db111dc594d0e9b27c283a47a"],["/bower_components/iron-selector/iron-selector.html","fd5fa9e6f3bf894b065f43d2711bba45"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","1129bf5593ece9189962e470025ab759"],["/bower_components/neon-animation/neon-animatable-behavior.html","a0e4868750147e67dcd56b5ac5535eab"],["/bower_components/neon-animation/neon-animation-runner-behavior.html","0d0e9eeccf315df7c0c6330049c2cd45"],["/bower_components/paper-behaviors/paper-button-behavior.html","1e6e9794c87cb389d4191911ec554890"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","ea41e4250bc3ea30e659071b61e0df33"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","ed51cc379e55570173529cd58ca00b59"],["/bower_components/paper-button/paper-button.html","75b7eeb8537f75878109d678fd6fd47a"],["/bower_components/paper-dialog-behavior/paper-dialog-behavior.html","02e7573d9959b3e056bac85c632cc939"],["/bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","53a7280f7f749585af412cd0fdd02e72"],["/bower_components/paper-dialog-scrollable/paper-dialog-scrollable.html","d3dd51a8591c536d9bf3c492730be10f"],["/bower_components/paper-dialog/paper-dialog.html","be9adca3e4e1f0b7f9c4cb7b33854a3b"],["/bower_components/paper-fab/paper-fab.html","775ca98d7c1538ea9d46e4621a33bdfb"],["/bower_components/paper-icon-button/paper-icon-button.html","eea29b3adb8c4b4cd68369ceb1614ff1"],["/bower_components/paper-input/paper-input-addon-behavior.html","9f7c79f09b3e662a7a0a0ec2210c5331"],["/bower_components/paper-input/paper-input-behavior.html","cd3410b154561988640bf6c0153b1346"],["/bower_components/paper-input/paper-input-char-counter.html","3afc53a558e36ccdbb0718b8da52b33a"],["/bower_components/paper-input/paper-input-container.html","d90f28b41fbe59cfaae6433e4998716d"],["/bower_components/paper-input/paper-input-error.html","270d241c108123335bf6dbe30d9e768f"],["/bower_components/paper-input/paper-input.html","97d3e67cd7e5997b4c8e08766d598bad"],["/bower_components/paper-material/paper-material-shared-styles.html","132d140281cbec6082b79d1e4e5cb690"],["/bower_components/paper-material/paper-material.html","fee22cbd61d645bce41b56c6bc227b18"],["/bower_components/paper-ripple/paper-ripple.html","9be0bea4c0ee964df2b113790575dd3b"],["/bower_components/paper-styles/color.html","676564d6f830197d333a4f4c2f6ebaca"],["/bower_components/paper-styles/default-theme.html","f34560e7b2fde3ec06e135a47a83056f"],["/bower_components/paper-styles/element-styles/paper-material-styles.html","75da735e5abb69a7bcfaa7a471ec487e"],["/bower_components/paper-styles/shadow.html","a42c9ee6919674abb5de48fe4364295a"],["/bower_components/paper-styles/typography.html","4ffc8e5a0a957686d7bf4a9c3110ba18"],["/bower_components/paper-toolbar/paper-toolbar.html","7e7d311e2c8808caeda8e881494d3eb2"],["/bower_components/polymer/polymer-micro.html","e468c439567926cbb06f2f1adc600822"],["/bower_components/polymer/polymer-mini.html","b22f4c983047b07bf3a0b844b1f55250"],["/bower_components/polymer/polymer.html","4ce72be3c73de991c14562634d99f5a3"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","b302282329b23c129971c9d7937b14e4"],["/index.html","0920cf0c53c7450fa3fb65fd95924a33"],["/src/my-app.html","68159dcf77e204626cd9709ed26703e1"],["/src/my-icons.html","9172796e408905a534f6db392f073232"],["/src/my-view1.html","6e9d80ea4f6a23c17d62d8408bd14296"],["/src/my-view2.html","3cf8c717982f01ec3b13a67eb1405687"],["/src/my-view3.html","0c258629ff6f5127124719c5c7cc27cf"],["/src/my-view404.html","68648af4920df1ee1d18360e69a9e362"],["/src/shared-styles.html","9a54440a65d5f5228e18de0e460c72f9"]];
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
    var navigateFallback = 'index.html';
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
