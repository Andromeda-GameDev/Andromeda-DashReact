using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class CreateProblem : MonoBehaviour
{
    public float gFrom = 8f, gTo = 10f, m1From = 90f, m1To = 110f, m2From = 70f, m2To = 80f;
    public double h1 = 20.5, h2 = 10.5, l = 0.5;
    public GameObject gText, m1Text, m2Text, resultText;
    private double g, m1, m2;

   //public FirebaseManager firebaseManager;

    // Access the current user
    Firebase.Auth.FirebaseUser myUser;
    Firebase.Database.FirebaseDatabase database;


    // Start is called before the first frame update
    void Start()
    {
        myUser = Firebase.Auth.FirebaseAuth.DefaultInstance.CurrentUser;
        database = Firebase.Database.FirebaseDatabase.DefaultInstance;

        g = Math.Round(UnityEngine.Random.Range(gFrom, gTo), 2);
        m1 = Math.Round(UnityEngine.Random.Range(m1From, m1To), 2);
        m2 = Math.Round(UnityEngine.Random.Range(m2From, m2To), 2);
        
        double v2 = Math.Sqrt(2*g*(h2 - l));
        double v1 = ((m1 + m2)/m1)*v2;
        double v0 = Math.Sqrt(v1*v1 - 2*g*(h1 - l));
        
        gText.GetComponent<TextMeshProUGUI>().text = "g = " + g;
        m1Text.GetComponent<TextMeshProUGUI>().text = "m1 = " + m1;
        m2Text.GetComponent<TextMeshProUGUI>().text = "m2 = " + m2;
        resultText.GetComponent<TextMeshProUGUI>().text = "Resultado = " + v0;
        
        Debug.Log("Result is " + v0);
        // print current user
        Debug.Log("Current user is " + myUser.Email);

        // write to database
        //Firebase.Database.DatabaseReference reference = database.RootReference;
        
        // Creating level data class to store and serialice the user progress
        LevelDataFactory ldf = new LevelDataFactory();

        /* LevelData levelData     = new LevelOneData(1, 2, 3);*/

        // Using factory to get the LevelData class that corresponds to the level data.
        LevelData levelData = ldf.getLevelData("problem1");
        levelData.added = 10;
        levelData.score = 10;
        levelData.time  = 10;

        // Serializing the data to Json
        string levelDataJson    = JsonUtility.ToJson(levelData); 
        
        // Declaring DataSender of type LevelDataSender and sending
        DataSender sendLevelData = new LevelDataSender("problem1", levelDataJson);
        sendLevelData.sendData();

        /*
        reference.Child("users").Child(myUser.UserId).Child("levels").Child("problem1").SetRawJsonValueAsync(levelDataJson);

        reference.Child("users").Child(myUser.UserId).Child("levels").Child("problem1").Child("score").SetValueAsync(88);
        reference.Child("users").Child(myUser.UserId).Child("levels").Child("problem1").Child("time").SetValueAsync(34);
        reference.Child("users").Child(myUser.UserId).Child("levels").Child("problem1").Child("added").SetValueAsync(67); 
        */
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
