using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Firebase;
using Firebase.Auth;
using Firebase.Database;
using TMPro;

public class FirebaseManager : MonoBehaviour
{
    [Header("Firebase")]
    public DependencyStatus dependencyStatus;
    public FirebaseAuth auth;
    public FirebaseUser User;
    public DatabaseReference DBreference;

    [Header("Login")]
    public TMP_InputField emailInput;
    public TMP_InputField passwordInput;
    public TMP_Text loginStatus;

    private void Awake()
    {
        // clear text fields
        emailInput.text = "";
        passwordInput.text = "";
        // Se revisa la existencia de dependencias de Firebase
       FirebaseApp.CheckAndFixDependenciesAsync().ContinueWith(task =>
       {

        dependencyStatus = task.Result;
        // En caso de que estén disponibles, se inicializa Firebase (se determina a través de la variable dependencyStatus que guarda el resultado)
        if(dependencyStatus == DependencyStatus.Available)
        {
            InitializeFirebase();
        }
        else
        {
            Debug.LogError("No se pudieron resolver ciertas dependencias de FireBase: " + dependencyStatus);
        }

       });
    }

    void InitializeFirebase()
    {
        Debug.Log("Inicializando Firebase");
        auth = FirebaseAuth.DefaultInstance;
        // Se inicializa la referencia a la base de datos
        DBreference = FirebaseDatabase.DefaultInstance.RootReference;
    }

    public bool IsValidEmail(string email_t)
    {
        // This is the regular expression for the email
        string pattern = @"^[a-zA-Z0-9._%+-]+@test\.com$";
        return System.Text.RegularExpressions.Regex.IsMatch(email_t, pattern);

    }

    public void LoginButton()
    {
        if(IsValidEmail(emailInput.text)){
            StartCoroutine(Login(emailInput.text, passwordInput.text));
        } else{
            Debug.LogFormat("Credentials don't follow the general expressión pattern: {0} ({1})", emailInput.text, passwordInput.text);
            loginStatus.text = "Error al iniciar sesión";
            loginStatus.color = Color.red;
        }

    }

    IEnumerator Login(string email, string password)
    {
        var loginTask = auth.SignInWithEmailAndPasswordAsync(email, password);
        yield return new WaitUntil(predicate: () => loginTask.IsCompleted);

        if(loginTask.Exception != null)
        {    
            Debug.LogWarning(message: $"Error al iniciar sesión: {loginTask.Exception}");
            loginStatus.color = Color.red;
            loginStatus.text = "Error al iniciar sesión";
        }
        else
        {
            User = loginTask.Result;
            Debug.LogFormat("Usuario inició sesión correctamente: {0} ({1})", User.DisplayName, User.Email);
            loginStatus.text = "Login correcto";
            loginStatus.color = Color.green;

            // change to the next scene
            yield return new WaitForSeconds(2);
            UnityEngine.SceneManagement.SceneManager.LoadScene("_LevelOne"); 

        }
    }

    public IEnumerator UpdateUserLeverScore(int level, int score){
        var DBTask = DBreference.Child("users").Child(User.UserId).Child("level").Child(level.ToString()).SetValueAsync(score);
        yield return new WaitUntil(predicate: () => DBTask.IsCompleted);

        if(DBTask.Exception != null)
        {
            Debug.LogWarning(message: $"Error al actualizar el puntaje: {DBTask.Exception}");
        }
        else
        {
            Debug.Log("Puntaje actualizado correctamente");   
        }
    }

    public IEnumerator UpdateUserTime(int level, int time){
        var DBTask = DBreference.Child("users").Child(User.UserId).Child("level").Child(level.ToString()).Child("time").SetValueAsync(time);
        yield return new WaitUntil(predicate: () => DBTask.IsCompleted);

        if(DBTask.Exception != null)
        {
            Debug.LogWarning(message: $"Error al actualizar el tiempo: {DBTask.Exception}");
        }
        else
        {
            Debug.Log("Tiempo actualizado correctamente");
        }
    }
    
}
