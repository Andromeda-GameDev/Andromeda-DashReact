using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class textToImageAPI : MonoBehaviour
{
    public Image uiImage;
    public string textFormula = "";

    public void UpdateFormula(string formula)
    {
        textFormula = formula;
        StartCoroutine(MakeRequest());
    }

    private IEnumerator MakeRequest()
    {
        UnityWebRequest webRequest = UnityWebRequestTexture.GetTexture("https://latex.codecogs.com/png?" + textFormula);
        yield return webRequest.SendWebRequest();

        if (webRequest.result == UnityWebRequest.Result.Success)
        {
            Texture2D texture = DownloadHandlerTexture.GetContent(webRequest);
            texture.filterMode = FilterMode.Bilinear;
            texture.wrapMode = TextureWrapMode.Clamp;

            Sprite sprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one * 0.5f);

            uiImage.sprite = sprite;
        }
        else
        {
            Debug.Log("Request error: " + webRequest.error);
        }
    }
}
