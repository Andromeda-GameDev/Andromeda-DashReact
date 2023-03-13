using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/*
 * @brief Represents a DataLevel class Factory
 * 
 * This class is intended to get the LevelData type of class, depending on
 * the string parameter. For example, if you wish to get the problem 1
 * LevelData class, you just type "problem1" in the getLeveData method.
 *
 */
public class LevelDataFactory
{

    /*
     * @brief Gets the LevelData class type depending on the string parameter
     *
     * The method will return the object you want, depending on the string
     * parameter you type. For example "problem1" will return LevelOneData
     * class.
     *
     * @param   levelDataType   The problem LevelData handler.
     *
     */
    public LevelData getLevelData(string levelDataType){
        if(levelDataType == null){
            return null;
        }

        if(string.Equals(levelDataType, "problem1", System.StringComparison.OrdinalIgnoreCase)){
            return new LevelOneData();
        }
        return null;
    }
}

/*
 * @brief Represents an abstract class for serialozing the level results.
 *
 * This is an abstract class for handling and serializing any type of 
 * LevelDataObject.
 *
 */
[System.Serializable]
public abstract class LevelData
{

    public int added;
    public int score;
    public double time;

    /*
     * @brief basic construct of LevelData class
     *
     * @param   added_t 
     * @param   score_t
     * @param   time_t
     *
     */
    public LevelData(int added_t, int score_t, double time_t){
        this.added = added_t;
        this.score = score_t;
        this.time = time_t;
    }
    public LevelData(){}

}


/*
 * @brief object for handling level one data results.
 *
 * This class inherits from LevelData class.
 *
 */
[System.Serializable]
public class LevelOneData : LevelData
{

    /*
     * @brief LevelOneData constructor
     * 
     * The parameters are used to create the LeveData object from which 
     * the parameters are inherited.
     *
     * @param added_t
     * @param score_t
     * @param time_t
     */
    public LevelOneData (int added_t, int score_t, double time_t) : base(added_t, score_t, time_t){}
    public LevelOneData(){}

}
