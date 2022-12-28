package com.example.mail_server.Model.DataManagement;
import com.example.mail_server.Model.Account.Account;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

public class Directory {
    public void createFolder(String path){
        File folder = new File(path);
        folder.mkdir();
        //System.out.println(folder.mkdir() +"heree");

    }
    //////////
    public void CopyFolder(File source ,File target,String id){
        try {
            if(source.isDirectory()) {
                copy(source,target,id);
            }else {
                if(target.getName().equalsIgnoreCase(source.getParentFile().getName()+".json")){
                    target=new File(target.getParent()+"/"+id+".json");
                }
                Files.copy(source.toPath(), target.toPath());

            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    public boolean createUserFolder(String folderName, Account account)
    {
        String path = "./Accounts/" + account.getEmail() + "/" + folderName;
        //check name not empty
        if(folderName.charAt(folderName.length() - 1) == ' ')
            return false;
        //check the folder in right format
        if(!folderNameIsValid(path, folderName))
            return false;
        File folder = new File(path);
        //check if there is folder alredy the same name
        if(folder.exists())
            return false;
        return folder.mkdir();
    }
    public void copy(File source,File target,String id) throws IOException{
        try {
            if(source.exists()) {
                if(!target.exists()) {
                    target.mkdir();
                }
                for(String child : source.list()) {
                    CopyFolder(new File(source,child),new File(target,child),id);
                }
            }else {
                throw new RuntimeException("File to be copied doesn't exist");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    public boolean renameMyFolder(File source, File target)
    {
        try {
            if (source.isDirectory()) {
                rename(source, target);
            } else {
                Files.copy(source.toPath(), target.toPath());
            }
        }catch (Exception er) {
            er.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean folderNameIsValid(String file, String name)
    {
        File f = new File(file);
        try {
            //used to check the name of folder as /\ <> * : " ? | can't be used in path
            f.getCanonicalPath();
            return true;
        } catch (IOException e) {
            return false;
        }
    }

    //////////////////////
    public boolean checkFolderExistence(String name, Account acc)
    {
        String path = "./Accounts/" + acc.getEmail() + "/" + name;
        File folder = new File(path);
        if(folder.exists())
            return true;
        return false;
    }
////////////////////
public boolean DeleteFolder(File file) { // to delete folders and files but not txt
    if (file.exists()) {
        for (File subFile : file.listFiles()) {
            if (subFile.isDirectory()) {
                DeleteFolder(subFile);
            } else {
                subFile.delete();
            }
        }
        file.delete();
        return true;
    } else {
        return false;
    }
}
///////////////////
public boolean rename(File path,File newPath) throws Exception{

    File sourceFile = path;
    File destFile = newPath;

    if (sourceFile.renameTo(destFile)) {
        System.out.println("File renamed successfully");
    } else {
        System.out.println("Failed to rename file");
        return false;
    }
    return true;

}
    public boolean CheckBeforeDelete(File file) {
        if (file.exists()) {
            for (File f : file.listFiles()) {
                if (f.isDirectory()) {
                    CheckBeforeDelete(f);
                }else{
                    f.delete();
                }
            }
            file.delete();
            return true;
        } else {
            return false;
        }
    }


}
