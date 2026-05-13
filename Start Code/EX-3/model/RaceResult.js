import { Duration } from "./Duration.js";
/**
 * This class handle a single race time for a given particicpant and sport type
 */
export class RaceResult {

       // TODO

     /**
      * @type {string} The participant's ID.
      * @type {string} The sport type.
      * @type {Duration} The race duration.
      * @private
      */
     _participantId;
     _sportType;
     _duration;
     /**
      * create ReaceResult object
      */
     constructor(participantId, sportType, duration) {
            this._participantId = participantId;
            this._sportType = sportType;
            this._duration = duration;
     }
     

  }