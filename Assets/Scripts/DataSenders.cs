using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/*
    TODO : check if can create factory for datasenders
*/

/*
 * @brief This is the base estructure of a sender.
 *
 * It declares some Firebase instances for sending data to the database. This is
 * the general structure and the sendData method is also abstract.
 *
 */
public abstract class DataSender
{
    protected Firebase.Auth.FirebaseUser myUser = Firebase.Auth.FirebaseAuth.DefaultInstance.CurrentUser;
    protected Firebase.Database.FirebaseDatabase database = Firebase.Database.FirebaseDatabase.DefaultInstance;
    protected Firebase.Database.DatabaseReference reference;


    public abstract void SendData(string level, string section);   
}

/*
 * @brief Class for sending Level progress data.
 *
 * Overrides sendData method for saving the level progress at selected column.
 *
 */
class LevelDataSender : DataSender
{
    private string problemType;
    private string levelDataJson;

    /*
     * @brief Constructor.
     *
     * @param problemType_t parameter that is set to problemType attribute. The name of the problem in DB.
     * @param levelDataJson level data in json format.
     *
     */
    public LevelDataSender(string problemType_t, string levelDataJson_t){
        this.reference      = this.database.RootReference;
        this.problemType    = problemType_t;
        this.levelDataJson  = levelDataJson_t;
    }

    /*
     * @brief Method for sending the data
     *
     * This method sends the data
     */
    public override void SendData(string level, string section){
        this.reference.Child("progress").Child(this.myUser.UserId).Child(level).Child(section).SetRawJsonValueAsync(this.levelDataJson);
    }
}